import { combineReducers } from 'redux'
import works from './works'
import fandomCategories from './fandom_categories'

export default combineReducers({
    works,
    fandomCategories,
})