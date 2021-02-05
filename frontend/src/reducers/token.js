import {GET_TOKEN} from '../constants';

const token = (state = {}, action) => {
    let token = null
    switch(action.type) {
        case GET_TOKEN:
            token = {...action.token}
            localStorage.setItem('token', token.token)
            return token;
        default:
            return state;
    }
}


export default token;