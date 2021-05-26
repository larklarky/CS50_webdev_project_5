import {GET_USER_LIKE, SET_LIKE, UNSET_LIKE} from '../constants';

const getUsersLike = (state = {liked: false}, action) => {
    switch(action.type) {
        case GET_USER_LIKE:
            if(action.usersLike.results.length > 0) {
                return {id: action.usersLike.results[0].id, liked: true}
            } else {
                return {liked: false}
            }
        case UNSET_LIKE:
            return {liked: false}
        case SET_LIKE:
            return {id: action.likeId, liked: true}
        default:
            return state;
    }
}


export default getUsersLike;