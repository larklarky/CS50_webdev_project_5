import {REGISTRATION} from '../constants';

const registration = (state = {}, action) => {
    let new_user = null
    switch(action.type) {
        case REGISTRATION:
            newUser = {...action.newUser}
            // window.location.href = '/'
            return newUser;
        default:
            return state;
    }
}


export default registration;