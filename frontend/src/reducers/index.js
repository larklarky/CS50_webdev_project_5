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
import likeWork from './likeWork'
import getUsersLike from './getUsersLike'


export default combineReducers({
    works,
    fandomCategories,
    fandomsByCategory,
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
    likeWork,
    getUsersLike,
})