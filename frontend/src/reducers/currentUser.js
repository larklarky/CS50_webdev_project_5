import {CURRENT_USER} from '../constants';

const currentUser = (state = {}, action) => {
    let currentUser = {}
    switch(action.type) {
        case CURRENT_USER:
            currentUser = {...action.currentUser}
            localStorage.setItem('currentUser', currentUser.id)
            return currentUser;
        default:
            return state;
    }
}


export default currentUser;