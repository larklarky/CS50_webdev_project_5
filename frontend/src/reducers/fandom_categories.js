import {RECIEVED_WORKS, RECIEVED_CATEGORIES} from '../constants';


const fandomCategories = (state = [], action) => {
    let categories = null
    switch(action.type) {
        case RECIEVED_CATEGORIES:
            categories = [...action.fandom_categories]
            return categories;
        default:
            return state;
    }
}


export default fandomCategories;