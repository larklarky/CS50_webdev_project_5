import {RECIEVED_WORKS_BY_USER} from '../constants'

const worksByUser = (state = [], action) => {
    let works = null
    switch(action.type) {
        case RECIEVED_WORKS_BY_USER:
            works = [...action.works]
            return works;
        default:
            return state;
    }
}


export default worksByUser;