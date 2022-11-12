import axios, { AxiosInstance } from "axios";
import firebase from "firebase/compat/app";
import { auth } from "src/boot/firebase";
import { ActymeError, ActymeErrorData } from "src/classes/ActymeError";
import { Configurable } from "src/classes/Configurable";
import { Matrix } from "src/types/Matrix";
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
        console.log(this._user);
        this.setAuthTokens({
            accessToken: await this._user.getIdToken(),
        });
    }

    public async passwordRequest(email: string): Promise<void> {
        await this._getUnauthenticatedAxios().post("/auth/password-request", {
            email,
        });
    }

    public async passwordReset(token: string, password: string): Promise<void> {
        await this._getUnauthenticatedAxios().post("/auth/password-reset", {
            token,
            password,
        });
    }

    public async getMe(): Promise<UserMeResponse> {
        if (this._user === null) {
            this._user = auth.currentUser;
        }
        return {
            // TODO: @QB add api endpoint
            user: this._user || ({} as firebase.User),
            // TODO: @QB add api endpoint to get matrices
            matrices: [
                {
                    id: "L6HN6W1WX5QCDBH6Toab",
                    title: "Test matrix",
                    userRoleOnMatrix: "admin",
                },
            ],
        };
    }

    public async getMatrix(matrixId: number): Promise<Matrix> {
        // const response = await this._getAuthenticatedAxios().get(
        // `/matrix/${matrixId}`
        // );
        const matrix: Matrix = {
            id: "L6HN6W1WX5QCDBH6Toab",
            title: "Test matrix",
            cells: [
                {
                    id: 1,
                    note: 0,
                    actions: [
                        {
                            id: 1,
                            title: "First action",
                            type: "checkbox",
                            checked: false,
                            impactedCriteriaIds: [1],
                        },
                        {
                            id: 2,
                            title: "Second action",
                            type: "progress",
                            state: "inProgress",
                            impactedCriteriaIds: [2],
                        },
                    ],
                    criteria: [
                        {
                            id: 1,
                            title: "First criterion",
                            impactedActionsIds: [1, 2],
                        },
                        {
                            id: 2,
                            title: "Second criterion",
                            impactedActionsIds: [2],
                        },
                    ],
                },
            ],
            determinantsKeys: [
                {
                    id: 1,
                    title: "First key",
                },
                {
                    id: 2,
                    title: "Second key",
                },
            ],
            success_keys: [
                {
                    id: 1,
                    title: "First key",
                },
                {
                    id: 2,
                    title: "Second key",
                },
            ],
        };
        return matrix;
    }

    private _getUnauthenticatedAxios(): AxiosInstance {
        if (this._unauthenticatedAxios === undefined) {
            this._unauthenticatedAxios = axios.create({
                baseURL: this.getConfig().baseUrl,
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
                    requestConfig.headers.Authorization = `Bearer ${
                        this.getAuthTokens().accessToken
                    }`;
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
                    if (error?.response?.data?.name === "auth.expiredToken") {
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
            if (this._user === null) {
                throw new Error("Must be logged in");
            }
            this._user
                .getIdToken()
                .then(token => {
                    this.setAuthTokens({
                        accessToken: token,
                    });
                    resolve();
                })
                .catch(error => {
                    this.setAuthTokens({
                        accessToken: null,
                    });
                    // Manage errors: if refresh token is expired, throw an unauthorized exception.
                    if (error?.response?.data?.name === "auth.expiredToken") {
                        reject(new ApiUnauthorizedError());
                    } else {
                        reject(new ApiInternalError(error));
                    }
                })
                .finally(() => {
                    this._refreshTokenPromise = null;
                });
        });
        return this._refreshTokenPromise;
    }
}
