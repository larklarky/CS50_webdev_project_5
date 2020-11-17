import {RECIEVED_WORKS_BY_FANDOM} from '../constants'

const worksByFandom = (state = [], action) => {
    let works = null
    switch(action.type) {
        case RECIEVED_WORKS_BY_FANDOM:
            works = [...action.works]
            return works;
        default:
            return state;
    }
}


export default worksByFandom;