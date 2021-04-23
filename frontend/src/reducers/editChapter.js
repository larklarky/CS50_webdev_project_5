import {EDIT_CHAPTER} from '../constants';

const editChapter = (state = {}, action) => {
    let editedChapter = null
    switch(action.type) {
        case EDIT_CHAPTER:
            editedChapter = {...action.editedChapter};
            window.location.href = `/works/${editedChapter.work}/chapters/${editedChapter.id}`;
            return editedChapter;
        default:
            return state;
    }
}

export default editChapter;