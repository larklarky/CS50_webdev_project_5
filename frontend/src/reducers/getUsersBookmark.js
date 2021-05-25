import {GET_USER_BOOKMARK, SET_BOOKMARK, UNSET_BOOKMARK} from '../constants';

const getUsersBookmark = (state = {}, action) => {
    switch(action.type) {
        case GET_USER_BOOKMARK:
            if(action.usersBookmark.results.length > 0) {
                return {id: action.usersBookmark.results[0].id, bookmarked: true}
            } else {
                return {liked: false}
            }
        case UNSET_BOOKMARK:
            return {bookmarked: false}
        case SET_BOOKMARK:
            return {id: action.bookmarkId, bookmarked: true}
        default:
            return state;
    }
}


export default getUsersBookmark;