export interface PasswordRequestBodyDto {
    // no DTO affected | link webapp: webapp/src/core/services/api/api.service.ts l.137
    /**
     * User email, to send an email with a link to change password.
     */
    email: string;
}
