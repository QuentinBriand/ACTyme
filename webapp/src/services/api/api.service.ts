import axios, { AxiosInstance } from "axios";
import { getAnalytics, setUserProperties } from "firebase/analytics";
import firebase from "firebase/compat/app";
import { auth } from "src/boot/firebase";
import { ActymeError, ActymeErrorData } from "src/classes/ActymeError";
import { Configurable } from "src/classes/Configurable";
import { PasswordRequestBodyDto } from "./password-request.dto";
import { UserMeResponse } from "./user-me.dto";

/**
 * API config interface.
 */
export interface ApiConfig {
    baseUrl: string;
    addSleepSeconds?: number;
}

/* Error management. */

export class ApiError extends ActymeError {
    constructor(public readonly data: ActymeErrorData) {
        super(data);
    }
}

export class ApiInternalError extends ApiError {
    constructor(error?: Error) {
        super({
            name: "general.internalError",
            message: error?.message || "Internal error",
        });
    }
}

export class ApiUnauthorizedError extends ApiError {
    constructor(message = "Unauthorized") {
        super({ name: "auth.unauthorized", message });
    }
}

/* Various types. */

export interface ApiAuthTokens {
    accessToken: string | null;
    refreshToken: string | null;
}

export type ApiSetAuthTokensCallback = (tokens: Partial<ApiAuthTokens>) => void;

export type ApiGetAuthTokensCallback = () => ApiAuthTokens;

/**
 * Main service class.
 */
export class Api extends Configurable<ApiConfig> {
    private _setAuthTokens: ApiSetAuthTokensCallback | undefined;
    private _getAuthTokens: ApiGetAuthTokensCallback | undefined;
    private _unauthenticatedAxios: AxiosInstance | undefined;
    private _authenticatedAxios: AxiosInstance | undefined;
    private _refreshTokenPromise: Promise<void> | null = null;
    private _user: firebase.User | null = null;

    public setCallbacks(
        setAuthTokens: ApiSetAuthTokensCallback,
        getAuthTokens: ApiGetAuthTokensCallback
    ): this {
        this._setAuthTokens = setAuthTokens;
        this._getAuthTokens = getAuthTokens;
        return this;
    }

    public setAuthTokens(tokens: Partial<ApiAuthTokens>): this {
        if (this._setAuthTokens === undefined) {
            throw new Error("call setCallbacks before");
        }
        this._setAuthTokens(tokens);
        return this;
    }

    public getAuthTokens(): ApiAuthTokens {
        if (this._getAuthTokens === undefined) {
            throw new Error("call setCallbacks before");
        }
        return this._getAuthTokens();
    }

    public async signIn(email: string, password: string): Promise<void> {
        await auth
            .signInWithEmailAndPassword(email, password)
            .then(response => {
                this._user = response.user;
            });
        if (this._user === null) {
            throw new Error("Authentification failed");
        }
        this.setAuthTokens({
            accessToken: await this._user.getIdToken(),
            refreshToken: await this._user.refreshToken,
        });
    }

    public async passwordRequest(body: PasswordRequestBodyDto): Promise<void> {
        const actionCodeSettings: firebase.auth.ActionCodeSettings = {
            url: "http://localhost:9000/sign-in",
            handleCodeInApp: true,
        };
        auth.sendPasswordResetEmail(body.email, actionCodeSettings);
    }

    public async passwordReset(token: string, password: string): Promise<void> {
        auth.confirmPasswordReset(token, password);
    }

    public async getMe(): Promise<UserMeResponse> {
        const request = {
            idToken: this.getAuthTokens().accessToken,
        };
        const res = await this._getAuthenticatedAxios().post(
            "accounts:lookup?key=" + window.process.env.FIREBASE_API_KEY,
            request
        );
        console.log(res.data);
        const analytics = getAnalytics();
        setUserProperties(analytics, {});
        const user: UserMeResponse = {
            email: res.data.users[0].email,
            emailVerified: res.data.users[0].emailVerified,
            displayName: res.data.users[0].displayName,
            photoURL: res.data.users[0].photoURL,
            uid: res.data.users[0].localId,
        };
        return user;
    }

    public async updateUser(user: UserMeResponse): Promise<UserMeResponse> {
        const request = {
            idToken: this.getAuthTokens().accessToken,
            displayName: user.displayName,
            photoUrl: user.photoURL,
            email: user.email,
        };

        const res = await this._getAuthenticatedAxios().post(
            "accounts:update?key=" + window.process.env.FIREBASE_API_KEY,
            request
        );
        return {
            email: res.data.email,
            emailVerified: res.data.emailVerified,
            displayName: res.data.displayName,
            photoURL: res.data.photoUrl,
            uid: res.data.localId,
        };
    }

    // public async getMatrix(matrixId: number): Promise<Matrix> {
    //     return {} as Matrix;
    // }

    private _getUnauthenticatedAxios(): AxiosInstance {
        if (this._unauthenticatedAxios === undefined) {
            this._unauthenticatedAxios = axios.create({
                baseURL: "https://identitytoolkit.googleapis.com/v1",
            });
            this._unauthenticatedAxios.interceptors.request.use(
                async requestConfig => {
                    const config = this.getConfig();
                    const sleepSeconds = config.addSleepSeconds || 0;
                    if (sleepSeconds > 0) {
                        await new Promise(resolve =>
                            setTimeout(resolve, sleepSeconds * 1000)
                        );
                    }
                    return requestConfig;
                }
            );
            this._unauthenticatedAxios.interceptors.response.use(
                res => {
                    return res;
                },
                async error => {
                    if (error?.response?.data !== undefined) {
                        throw new ApiError(error?.response?.data);
                    } else {
                        throw new ApiInternalError(error);
                    }
                }
            );
        }
        return this._unauthenticatedAxios;
    }

    private _getAuthenticatedAxios(): AxiosInstance {
        if (this._authenticatedAxios === undefined) {
            this._authenticatedAxios = axios.create({
                baseURL: this.getConfig().baseUrl,
            });
            this._authenticatedAxios.interceptors.request.use(
                async requestConfig => {
                    const config = this.getConfig();
                    const sleepSeconds = config.addSleepSeconds || 0;
                    if (sleepSeconds > 0) {
                        await new Promise(resolve =>
                            setTimeout(resolve, sleepSeconds * 1000)
                        );
                    }
                    if (this.getAuthTokens().accessToken === null) {
                        await this._doRefreshToken();
                    }
                    if (requestConfig.headers === undefined) {
                        requestConfig.headers = {};
                    }
                    requestConfig.headers.Authorization = {
                        Bearer: this.getAuthTokens().accessToken,
                    };
                    return requestConfig;
                }
            );
            this._authenticatedAxios.interceptors.response.use(
                res => {
                    // Nothing to do.
                    return res;
                },
                async error => {
                    // Manage the case when the access token is expired.
                    if (
                        error.response.data.error.message ===
                            "CREDENTIAL_TOO_OLD_LOGIN_AGAIN" ||
                        error.response.data.error.message === "INVALID_ID_TOKEN"
                    ) {
                        // So, refresh token.
                        await this._doRefreshToken();
                        // And then, replay the request.
                        return this._getAuthenticatedAxios().request(
                            error.config
                        );
                    } else if (error?.response?.data !== undefined) {
                        throw new ApiError(error?.response?.data);
                    } else {
                        throw new ApiInternalError(error);
                    }
                }
            );
        }
        return this._authenticatedAxios;
    }

    private async _doRefreshToken(): Promise<void> {
        // Already refreshing?
        if (this._refreshTokenPromise !== null) {
            return this._refreshTokenPromise;
        }

        // OK create promise to refresh token.
        this._refreshTokenPromise = new Promise((resolve, reject) => {
            const refreshAxios = axios.create({
                baseURL: "https://securetoken.googleapis.com/v1",

                headers: {
                    Authorization: {
                        Bearer: this.getAuthTokens().accessToken,
                    },
                },

                params: {
                    key: window.process.env.FIREBASE_API_KEY,
                },
            });
            refreshAxios
                .post("token?key=" + window.process.env.FIREBASE_API_KEY, {
                    grant_type: "refresh_token",
                    refresh_token: this.getAuthTokens().refreshToken,
                })
                .then(res => {
                    this.setAuthTokens({
                        accessToken: res.data.id_token,
                        refreshToken: res.data.refresh_token,
                    });
                })
                .catch(err => {
                    console.log(err);
                    this._user = null;
                    // this.setAuthTokens({
                    // accessToken: null,
                    // refreshToken: null,
                    // });
                    reject(err);
                })
                .finally(() => {
                    this._refreshTokenPromise = null;
                    // And then, replay the request.
                    resolve();
                });
        });
        return this._refreshTokenPromise;
    }
}
