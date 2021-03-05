import {CURRENT_USER} from '../constants';

const currentUser = (state = {}, action) => {
    let currentUser = null
    switch(action.type) {
        case CURRENT_USER:
            currentUser = {...action.currentUser}
            return currentUser;
        default:
            return state;
    }
}


export default currentUser;