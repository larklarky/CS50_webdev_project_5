import {GET_WORK} from '../constants';


const work = (state = {}, action) => {
    let work = null
    switch(action.type) {
        case GET_WORK:
            work = {...action.work}
            return work;
        default:
            return state;
    }
}


export default work;