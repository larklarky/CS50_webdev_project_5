import {RECIEVED_WORKS, RECIEVED_CATEGORIES, RECIEVED_FANDOMS_BY_CATEGORY, RECIEVED_WORKS_BY_FANDOM, GET_USER, 
    RECIEVED_WORKS_BY_USER, GET_WORK, RECIEVED_CHAPTERS, GET_CHAPTER, REGISTRATION, ERROR_MESSAGE, CURRENT_USER, CREATE_WORK} from '../constants';
import history from '../history';




export const getWorks = () => dispatch => {
    const token = localStorage.getItem('token')
    let headers = {}
    if(token !== null) {
        headers['Authorization'] = `Token ${token}`
    }

    return fetch(
        'http://127.0.0.1:8000/api/works/',
        {headers: headers},
    )
    .then((response) => {
        return response.json()
    })
    .then(response => dispatch({type: RECIEVED_WORKS, works: response}))
}

export const getFandomCategories = () => dispatch => {
    const token = localStorage.getItem('token')
    let headers = {}
    if(token !== null) {
        headers['Authorization'] = `Token ${token}`
    }

    return fetch(
        'http://127.0.0.1:8000/api/fandom_categories/',
        {headers: headers}
    )
    .then((response) => {
        return response.json()
    })
    .then(response => dispatch({type: RECIEVED_CATEGORIES, fandom_categories: response}))
}

export const getListOfFandomsByCategory = (categoryId) => dispatch => {
    const token = localStorage.getItem('token')
    let headers = {}
    if(token !== null) {
        headers['Authorization'] = `Token ${token}`
    }

    return fetch(
        `http://127.0.0.1:8000/api/fandoms/?category=${categoryId}`,
        {headers: headers}

    )
    .then((response)=>{
        return response.json()
    })
    .then(response => dispatch({type: RECIEVED_FANDOMS_BY_CATEGORY, fandoms: response}))
}

export const getListOfWorksByFandom = (fandomId) => dispatch => {
    const token = localStorage.getItem('token')
    let headers = {}
    if(token !== null) {
        headers['Authorization'] = `Token ${token}`
    }

    return fetch(
        `http://127.0.0.1:8000/api/works/?fandom=${fandomId}`,
        {headers: headers}
    )
    .then((response) =>{
        return response.json()
    })
    .then(response => dispatch({type: RECIEVED_WORKS_BY_FANDOM, works: response})) 
}

export const getWorksByUser = (userId) => dispatch => {
    const token = localStorage.getItem('token')
    let headers = {}
    if(token !== null) {
        headers['Authorization'] = `Token ${token}`
    }

    return fetch(
        `http://127.0.0.1:8000/api/works/?user=${userId}`,
        {headers: headers}
    )
    .then((response) =>{
        return response.json()
    })
    .then(response => dispatch({type: RECIEVED_WORKS_BY_USER, works: response}))
}

export const getUser = (userId) => dispatch => {
    const token = localStorage.getItem('token')
    let headers = {}
    if(token !== null) {
        headers['Authorization'] = `Token ${token}`
    }

    return fetch(
        `http://127.0.0.1:8000/api/users/${userId}`,
        {headers: headers}
    )
    .then ((response) => {
        return response.json()
    })
    .then(response => dispatch({type: GET_USER, user: response}))
}

export const getWork = (workId) => dispatch => {
    const token = localStorage.getItem('token')
    let headers = {}
    if(token !== null) {
        headers['Authorization'] = `Token ${token}`
    }

    return fetch(
        `http://127.0.0.1:8000/api/works/${workId}`,
        {headers: headers}
    )
    .then((response) => {
        return response.json()
    })
    .then(response => dispatch({type: GET_WORK, work: response}))
}

export const getChapters = (workId) => dispatch => {
    const token = localStorage.getItem('token')
    let headers = {}
    if(token !== null) {
        headers['Authorization'] = `Token ${token}`
    }

    return fetch(
        `http://127.0.0.1:8000/api/chapters/?work=${workId}`,
        {headers: headers}
    )
    .then((response) => {
        return response.json()
    })
    .then( response => dispatch({type: RECIEVED_CHAPTERS, chapters: response}))
} 

export const getChapter = (chapterId) => dispatch => {
    const token = localStorage.getItem('token')
    let headers = {}
    if(token !== null) {
        headers['Authorization'] = `Token ${token}`
    }

    return fetch(
        `http://127.0.0.1:8000/api/chapters/${chapterId}`,
        {headers: headers}
    )
    .then((response) => {
        return response.json()
    })
    .then(response => dispatch({type: GET_CHAPTER, chapter: response}))
}

export const getCurrentUser = () => dispatch => {
    const token = localStorage.getItem('token')
    let headers = {}
    if(token !== null) {
        headers['Authorization'] = `Token ${token}`
    }

    return fetch(
        `http://127.0.0.1:8000/api/users/current/`,
        {headers: headers}
    )
    .then((response) => {
        return response.json()
    })
    .then(response => {
        localStorage.setItem('currentUser', response.currentUser)
        dispatch({type: CURRENT_USER, currentUser: response})
    })
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
        response.json().then(result => {
            if (response.status === 200) {
                localStorage.setItem('token', result.token)
                window.location.href = '/'
            } else {
                dispatch({type: ERROR_MESSAGE, errorMessage: result})
            }
        })
    })
}

export const SignUp = (username, email, password) => dispatch => {
    return fetch(
        `http://127.0.0.1:8000/api/registration/`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: username, password: password, email: email})
        }
    )
    .then((response) => {
        response.json().then(result => {
            if (response.status === 201) {
                dispatch({type: REGISTRATION, newUser: result})
            } else {
                dispatch({type: ERROR_MESSAGE, errorMessage: result})
            }
        })
            
    })
}

export const logout = () => dispatch => {
    const token = localStorage.getItem('token')
    let headers = {}
    if(token !== null) {
        headers['Authorization'] = `Token ${token}`
    } else {
        window.location.href = '/'
    }
    return fetch(
        `http://127.0.0.1:8000/api/logout/`,
        {
            method: 'DELETE',
            headers: headers 
        }
    )
    .then((response) => {
            if(response.status === 204) {
                localStorage.removeItem('token')
                window.location.href = '/'
            }
    })
    
}

// This action is not complete. Data format for creation work????
export const createWork = (title, description, rating, completed, relationships, characters, categories, warnings, fandoms) => dispatch => {
    const token = localStorage.getItem('token')
    let headers = {}
    if(token !== null) {
        headers['Authorization'] = `Token ${token}`
    }
    return fetch(
        `http://127.0.0.1:8000/api/works/`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                title: title, 
                description: description,
                rating: rating,
                completed: completed,
                relationships: relationships,
                characters: characters,
                categories: categories,
                warnings: warnings,
                fandoms: fandoms,
            })
        }
    )
    .then((response) => {
        return response.json()
    })
    .then(response => {dispatch({type: CREATE_WORK, newWork: response})})

}

