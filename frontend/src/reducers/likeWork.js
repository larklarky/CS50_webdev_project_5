import {LIKE_WORK} from '../constants';

const likeWork = (state = {}, action) => {
    let like = null
    switch(action.type) {
        case LIKE_WORK:
            like = {...action.like}
            return like;
        default:
            return state;
    }
}


export default likeWork;