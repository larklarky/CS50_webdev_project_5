import {GET_USER_LIKE} from '../constants';

const getUsersLike = (state = false, action) => {
    switch(action.type) {
        case GET_USER_LIKE:
            if(action.usersLike.results.length > 0) {
                return true
            } else {
                return false
            }
        default:
            return state;
    }
}


export default getUsersLike;