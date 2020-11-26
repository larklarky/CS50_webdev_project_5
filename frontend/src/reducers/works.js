import {RECIEVED_WORKS} from '../constants';


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