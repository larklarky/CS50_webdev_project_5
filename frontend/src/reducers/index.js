import { combineReducers } from 'redux'
import works from './works'
import fandomCategories from './fandom_categories'
import fandomsByCategory from './fandomsByCategory'

export default combineReducers({
    works,
    fandomCategories,
    fandomsByCategory,
})