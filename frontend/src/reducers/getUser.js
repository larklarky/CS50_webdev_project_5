import {GET_USER} from '../constants';


const user = (state = {}, action) => {
    let user = null
    switch(action.type) {
        case GET_USER:
            user = {...action.user}
            return user;
        default:
            return state;
    }
}


export default user;