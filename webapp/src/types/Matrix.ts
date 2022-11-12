export interface MatrixCellKey {
    id: number;
    title: string;
}

export type MatrixActionType = "checkbox" | "progress";

export interface MatrixAction {
    id: number;
    title: string;
    type: MatrixActionType;
    state?: "notStarted" | "inProgress" | "done";
    checked?: boolean;
    impactedCriteriaIds?: number[];
}

export interface MatrixCriteria {
    id: number;
    title: string;
    impactedActionsIds?: number[];
}

export interface MatrixCell {
    id: number;
    note: number;
    criteria: MatrixCriteria[];
    actions: MatrixAction[];
}

export interface Matrix {
    id: string;
    title: string;
    determinantsKeys: MatrixCellKey[];
    successKeys: MatrixCellKey[];
    cells: MatrixCell[];
}
