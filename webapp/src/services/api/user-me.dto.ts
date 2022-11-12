import firebase from "firebase/compat";
import { UserProfileMatrixDto } from "./user-profile-matrix.dto";

export interface UserMeResponse {
    user: firebase.User;
    matrices: UserProfileMatrixDto[];
}
