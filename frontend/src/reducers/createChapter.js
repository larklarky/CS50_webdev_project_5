import {CREATE_CHAPTER} from '../constants';

const createChapter = (state = {}, action) => {
    let newChapter = null
    switch(action.type) {
        case CREATE_CHAPTER:
            newChapter = {...action.newChapter};
            window.location.href = `/works/${newChapter.work}`;
            return newChapter;
        default:
            return state;
    }
}

export default createChapter;