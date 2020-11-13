import {RECIEVED_WORKS, RECIEVED_CATEGORIES, RECIEVED_FANDOMS_BY_CATEGORY} from '../constants';


const fandomsByCategory = (state = [], action) => {
    let fandoms = null
    switch(action.type) {
        case RECIEVED_FANDOMS_BY_CATEGORY:
            fandoms = [...action.fandoms]
            return fandoms;
        default:
            return state;
    }
}


export default fandomsByCategory;