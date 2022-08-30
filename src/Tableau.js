
class Tableau {
    constructor(_name, _score) {
        this.name = _name
        this.score = _score
        this.evaluations = []
        this.actions = []
    }

    addEvaluation(_evaluation) {
        _evaluation.preventDefault();
        this.evaluations.push(_evaluation.target[0].value);
        _evaluation.target[0].value = ""
    }
    addAction(_action) {
        _action.preventDefault();
        const action = _action.target[0].value;
        const actionObject = new Action(action, false);
        this.actions.push(actionObject);
        _action.target[0].value = ""
    }
}

class Action {
    constructor(_action, _checked) {
        this.action = _action
        this.checked = _checked
    }
}

export default Tableau;