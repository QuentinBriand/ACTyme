export interface MatrixCellKey {
    id: number;
    title: string;
}

export type MatrixActionType = "checkbox" | "progress";
export type MatrixActionState = "notStarted" | "inProgress" | "done";

export interface MatrixAction {
    id: number;
    title: string;
    type: MatrixActionType;
    state?: MatrixActionState;
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
    action_note: number;
    evaluation_note: number;
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
