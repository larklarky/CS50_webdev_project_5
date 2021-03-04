import {CURRENT_USER} from '../constants';
import history from '../history';

const currentUser = (state = {}, action) => {
    let currentUser = null
    switch(action.type) {
        case CURRENT_USER:
            currentUser = {...action.currentUser}
            // window.location.href = '/'
            // history.push(`/`)
            return currentUser;
        default:
            return state;
    }
}


export default currentUser;