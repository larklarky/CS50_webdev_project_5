import {GET_FANDOM} from '../constants';


const getFandom = (state = {}, action) => {
    let fandom = null
    switch(action.type) {
        case GET_FANDOM:
            fandom = {...action.fandom}
            return fandom;
        default:
            return state;
    }
}


export default getFandom;