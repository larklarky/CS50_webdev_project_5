import {CREATE_WORK} from '../constants';

const createWork = (state = {}, action) => {
    let newWork = null
    switch(action.type) {
        case CREATE_WORK:
            newWork = {...action.newWork}
            return newWork;
        default:
            return state;
    }
}

export default createWork;