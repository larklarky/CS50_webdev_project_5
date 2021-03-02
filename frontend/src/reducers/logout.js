import {LOGOUT} from '../constants';

const logout = (state = {}, action) => {
    let logout = null
    switch(action.type) {
        case LOGOUT:
            logout = {...actiom.logout}
            return LOGOUT;
        default:
            return state;
    } 
}

export default logout;