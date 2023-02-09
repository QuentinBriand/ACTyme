import { MatrixAction, MatrixCriteria } from "./Matrix";

export interface TableCell {
    id: number;
    title?: string;
    type: "success" | "determinant" | "cell" | "header" | "empty";
    actions?: MatrixAction[];
    criteria?: MatrixCriteria[];
    last?: boolean;
}
