import { combineReducers } from 'redux'
import works from './works'
import fandomCategories from './fandom_categories'
import fandomsByCategory from './fandomsByCategory'
import worksByFandom from './worksByFandoms'
import worksByUser from './worksByUser'
import user from './getUser'
import work from './work'
import chapters from './chapters'
import chapter from './chapter'
import registration from './registration'
import errorMessage from './errorMessage'
import currentUser from './currentUser'
import createWork from './createWork'
import createChapter from './createChapter'
import editWork from './editWork'
import editChapter from './editChapter'
import getUsersLike from './getUsersLike'
import getUsersBookmark from './getUsersBookmark'
import usersBookmarks from './usersBookmarks'
import getFandom from './getFandom'


export default combineReducers({
    works,
    fandomCategories,
    fandomsByCategory,
    getFandom,
    worksByFandom,
    worksByUser,
    user,
    work,
    chapters,
    chapter,
    registration,
    errorMessage,
    currentUser,
    createWork,
    createChapter,
    editWork,
    editChapter,
    getUsersLike,
    getUsersBookmark,
    usersBookmarks,
})