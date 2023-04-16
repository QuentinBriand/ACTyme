import { MatrixAction } from "src/types/Matrix";
import { TableCell } from "src/types/TableCell";

export const getCriteriaPercentage = (currentCell: TableCell) => {
    let total = 0;
    const criteria = currentCell.criteria;
    if (criteria === undefined || criteria.length === 0) {
        return 0;
    }
    criteria.forEach(crit => {
        const linkedActions = crit.impactedActionsIds;
        if (linkedActions === undefined || linkedActions.length === 0) {
            return;
        }
        if (currentCell === undefined) {
            return;
        }
        const linkedActionLength = linkedActions.length;
        let actionsDone = 0;
        linkedActions.forEach(actionId => {
            const action = currentCell.actions?.find(
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

export const getActionsPercentage = (currentCard: TableCell) => {
    let total = 0;
    const actions = currentCard.actions;
    if (actions === undefined || actions.length === 0) {
        return 0;
    }
    actions.forEach(matrixDetail => {
        total += isActionDone(matrixDetail) ? 1 : 0;
    });
    return total / actions.length;
};

export const isActionDone = (action: MatrixAction) => {
    return action.type === "checkbox"
        ? action.checked
        : action.state === "done";
};
