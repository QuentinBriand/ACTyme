import { MatrixAction, MatrixCriteria } from "./Matrix";

export interface TableCell {
    id: number;
    title?: string;
    type: "success" | "determinant" | "cell" | "header";
    actions?: MatrixAction[];
    criteria?: MatrixCriteria[];
}
