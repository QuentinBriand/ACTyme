import { Role } from "src/types/Role";

export interface UserProfileMatrixDto {
    id: string;
    title: string;
    userRoleOnMatrix: Role | null;
}
