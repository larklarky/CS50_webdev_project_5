import {REGISTRATION} from '../constants';

const registration = (state = {}, action) => {
    let newUser = null
    switch(action.type) {
        case REGISTRATION:
            newUser = {...action.newUser}
            window.location.href = '/login'
            return newUser;
        default:
            return state;
    }
}


export default registration;