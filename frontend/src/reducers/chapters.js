import {RECIEVED_CHAPTERS} from '../constants';


const chapters = (state = [], action) => {
    let chapters = null
    switch(action.type) {
        case RECIEVED_CHAPTERS:
            chapters = [...action.chapters]
            return chapters;
        default:
            return state;
    }
}


export default chapters;