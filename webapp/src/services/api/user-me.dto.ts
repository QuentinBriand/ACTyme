export interface UserMeResponse {
    email: string;
    emailVerified: boolean;
    displayName?: string;
    photoURL?: string;
    uid: string;
}
