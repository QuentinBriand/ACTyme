import { MatrixCriteria, MatrixAction, MatrixCell } from "src/types/Matrix";

export const getCriteriaPercentage = (
    criteria: MatrixCriteria[],
    currentCard: MatrixCell
) => {
    let total = 0;
    criteria.forEach(crit => {
        const linkedActions = crit.impactedActionsIds;
        if (linkedActions === undefined || linkedActions.length === 0) {
            return;
        }
        if (currentCard === undefined) {
            return;
        }
        const linkedActionLength = linkedActions.length;
        let actionsDone = 0;
        linkedActions.forEach(actionId => {
            const action = currentCard.actions.find(
                action => action.id === actionId
            );
            if (action === undefined) {
                return;
            }
            actionsDone += isActionDone(action) ? 1 : 0;
        });
        total += actionsDone / linkedActionLength;
    });
    return total / criteria.length;
};

export const getActionsPercentage = (matrixDetails: MatrixAction[]) => {
    let total = 0;
    matrixDetails.forEach(matrixDetail => {
        total += isActionDone(matrixDetail) ? 1 : 0;
    });
    return total / matrixDetails.length;
};

export const isActionDone = (action: MatrixAction) => {
    return action.type === "checkbox"
        ? action.checked
        : action.state === "done";
};
