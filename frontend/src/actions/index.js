import {RECIEVED_WORKS} from '../constants';

export const getWorks = () => dispatch => {
    return fetch(
        'http://127.0.0.1:8000/api/works/',
        {headers: {'Authorization': 'Token ba1de3e3decd80bdba20c39b9dcd6117d7e8d66c'} }
    )
    .then((response)=>{
        return response.json()
    })
    .then(response => dispatch({type: RECIEVED_WORKS, works: response}))
}