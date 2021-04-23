import {GET_CHAPTER} from '../constants';


const chapter = (state = {}, action) => {
    let chapter = null
    switch(action.type) {
        case GET_CHAPTER:
            chapter = {...action.chapter}
            console.log('reducer chapter', chapter)
            return chapter;
        default:
            return state;
    }
}


export default chapter;