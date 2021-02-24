import {ERROR_MESSAGE} from '../constants';

const errorMessage = (state = {}, action) => {
    let errorMessage = null
    switch(action.type) {
        case ERROR_MESSAGE:
            errorMessage = {...action.errorMessage}
            return errorMessage;
        default:
            return state;
    }
}


export default errorMessage;