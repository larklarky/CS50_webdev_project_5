import {RECIEVED_WORKS, RECIEVED_CATEGORIES, RECIEVED_FANDOMS_BY_CATEGORY, RECIEVED_WORKS_BY_FANDOM, GET_USER, 
    RECIEVED_WORKS_BY_USER, GET_WORK, RECIEVED_CHAPTERS, GET_CHAPTER, GET_TOKEN} from '../constants';
import works from '../reducers/works';

export const getWorks = () => dispatch => {
    return fetch(
        'http://127.0.0.1:8000/api/works/',
        {headers: {'Authorization': `Token ${localStorage.getItem('token')}`} }
    )
    .then((response)=>{
        return response.json()
    })
    .then(response => dispatch({type: RECIEVED_WORKS, works: response}))
}

export const getFandomCategories = () => dispatch => {
    return fetch(
        'http://127.0.0.1:8000/api/fandom_categories/',
        {headers: {'Authorization': `Token ${localStorage.getItem('token')}`}}
    )
    .then((response) => {
        return response.json()
    })
    .then(response => dispatch({type: RECIEVED_CATEGORIES, fandom_categories: response}))
}

export const getListOfFandomsByCategory = (categoryId) => dispatch => {
    return fetch(
        `http://127.0.0.1:8000/api/fandoms/?category=${categoryId}`,
        {headers: {'Authorization': `Token ${localStorage.getItem('token')}`}}

    )
    .then((response)=>{
        return response.json()
    })
    .then(response => dispatch({type: RECIEVED_FANDOMS_BY_CATEGORY, fandoms: response}))
}

export const getListOfWorksByFandom = (fandomId) => dispatch => {
    return fetch(
        `http://127.0.0.1:8000/api/works/?fandom=${fandomId}`,
        {headers: {'Authorization': `Token ${localStorage.getItem('token')}`}}
    )
    .then((response) =>{
        return response.json()
    })
    .then(response => dispatch({type: RECIEVED_WORKS_BY_FANDOM, works: response})) 
}

export const getWorksByUser = (userId) => dispatch => {
    return fetch(
        `http://127.0.0.1:8000/api/works/?user=${userId}`,
        {headers: {'Authorization': `Token ${localStorage.getItem('token')}`}}
    )
    .then((response) =>{
        return response.json()
    })
    .then(response => dispatch({type: RECIEVED_WORKS_BY_USER, works: response}))
}

export const getUser = (userId) => dispatch => {
    return fetch(
        `http://127.0.0.1:8000/api/users/${userId}`,
        {headers: {'Authorization': `Token ${localStorage.getItem('token')}`}}
    )
    .then ((response) => {
        return response.json()
    })
    .then(response => dispatch({type: GET_USER, user: response}))
}

export const getWork = (workId) => dispatch => {
    console.log('workid action', workId)
    return fetch(
        `http://127.0.0.1:8000/api/works/${workId}`,
        {headers: {'Authorization': `Token ${localStorage.getItem('token')}`}}
    )
    .then((response) => {
        return response.json()
    })
    .then(response => dispatch({type: GET_WORK, work: response}))
}

export const getChapters = (workId) => dispatch => {
    return fetch(
        `http://127.0.0.1:8000/api/chapters/?work=${workId}`,
        {headers: {'Authorization': `Token ${localStorage.getItem('token')}`}}
    )
    .then((response) => {
        return response.json()
    })
    .then( response => dispatch({type: RECIEVED_CHAPTERS, chapters: response}))
} 

export const getChapter = (chapterId) => dispatch => {
    return fetch(
        `http://127.0.0.1:8000/api/chapters/${chapterId}`,
        {headers: {'Authorization': `Token ${localStorage.getItem('token')}`}}
    )
    .then((response) => {
        return response.json()
    })
    .then(response => dispatch({type: GET_CHAPTER, chapter: response}))
}


export const getToken = (username, password) => dispatch => {
    return fetch(
        `http://127.0.0.1:8000/api/token/`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({username: username, password: password})
        } 
    )
    .then((response) => {
        return response.json()
    })
    .then(response => dispatch({type: GET_TOKEN, token: response}))
}

