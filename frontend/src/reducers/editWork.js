import {EDIT_WORK} from '../constants';

const editWork = (state = {}, action) => {
    let editedWork = null
    switch(action.type) {
        case EDIT_WORK:
            editedWork = {...action.editedWork}
            window.location.href = `/works/add/${editedWork.id}/chapter`;
            return editedWork;
        default:
            return state;
    }
}

export default editWork;