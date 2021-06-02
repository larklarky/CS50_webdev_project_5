import {USERS_BOOKMARKS} from '../constants';

const UsersBookmarks = (state = {}, action) => {
    let bookmarksList = null
    switch(action.type) {
        case USERS_BOOKMARKS:
            bookmarksList = {...action.usersBookmarks}
            return bookmarksList
        default:
            return state;
    }
}


export default UsersBookmarks;