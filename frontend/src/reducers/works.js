import {RECIEVED_WORKS, RECIEVED_CATEGORIES} from '../constants';


const works = (state = [], action) => {
    let works = null
    switch(action.type) {
        case RECIEVED_WORKS:
            works = [...action.works]
            return works;
        default:
            return state;
    }
}


export default works;