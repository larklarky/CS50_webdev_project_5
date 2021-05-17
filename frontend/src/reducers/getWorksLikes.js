import {GET_LIKES_FOR_WORK} from '../constants';

const getWorksLikes = (state = {}, action) => {
    let worksLikes = null
    switch(action.type) {
        case GET_LIKES_FOR_WORK:
            worksLikes = {...action.worksLikes}
            return worksLikes;
        default:
            return state;
    }
}


export default getWorksLikes;