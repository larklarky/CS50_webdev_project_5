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
import token from './token'
import registration from './registration'
import errorMessage from './errorMessage';

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
    token,
    registration,
    errorMessage,
})