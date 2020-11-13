import {RECIEVED_WORKS, RECIEVED_CATEGORIES, RECIEVED_FANDOMS_BY_CATEGORY} from '../constants';
import works from '../reducers/works';

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

export const getFandomCategories = () => dispatch => {
    return fetch(
        'http://127.0.0.1:8000/api/fandom_categories/',
        {headers: {'Authorization': 'Token ba1de3e3decd80bdba20c39b9dcd6117d7e8d66c'}}
    )
    .then((response) => {
        return response.json()
    })
    .then(response => dispatch({type: RECIEVED_CATEGORIES, fandom_categories: response}))
}

export const getListOfFandomsByCategory = (categoryId) => dispatch => {
    return fetch(
        `http://127.0.0.1:8000/api/fandoms/?category=${categoryId}`,
        {headers: {'Authorization': 'Token ba1de3e3decd80bdba20c39b9dcd6117d7e8d66c'}}

    )
    .then((response)=>{
        return response.json()
    })
    .then(response => dispatch({type: RECIEVED_FANDOMS_BY_CATEGORY, fandoms: response}))
}

