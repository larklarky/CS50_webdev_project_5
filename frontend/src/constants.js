import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMarsDouble, faVenusDouble, faVenusMars, faRandom, faGenderless, faBroom, faDragon, faFly, faBullseye, faCircle, faDotCircle } from '@fortawesome/free-solid-svg-icons'


export const RECIEVED_WORKS = 'RECIEVED_WORKS';
export const RECIEVED_CATEGORIES = 'RECIEVED_CATEGORIES';
export const RECIEVED_FANDOMS_BY_CATEGORY = 'RECIEVED_FANDOMS_BY_CATEGORY';
export const RECIEVED_WORKS_BY_FANDOM = 'RECIEVED_WORKS_BY_FANDOM';
export const RECIEVED_WORKS_BY_USER = 'RECIEVED_WORKS_BY_USER';
export const GET_USER = 'GET_USER';
export const GET_WORK = 'GET_WORK';
export const RECIEVED_CHAPTERS = 'RECIEVED_CHAPTERS';
export const GET_CHAPTER = 'GET_CHAPTER';
export const CURRENT_USER = 'CURRENT_USER';
export const REGISTRATION  = 'REGISTRATION';
export const ERROR_MESSAGE = 'ERROR_MESSAGE';
export const CREATE_WORK = 'CREATE_WORK';
export const CREATE_CHAPTER = 'CREATE_CHAPTER';
export const EDIT_WORK = 'EDIT_WORK';
export const EDIT_CHAPTER = 'EDIT_CHAPTER';
export const GET_USER_LIKE = 'GET_USER_LIKE';
export const DELETE_LIKE = 'DELETE_LIKE';
export const SET_LIKE = 'SET_LIKE';
export const UNSET_LIKE = 'UNSET_LIKE';
export const GET_USER_BOOKMARK = 'GET_USER_BOOKMARK';
export const DELETE_BOOKMARK = 'DELETE_BOOKMARK';
export const SET_BOOKMARK = 'SET_BOOKMARK';
export const UNSET_BOOKMARK = 'UNSET_BOOKMARK';




export const WARNINGS = {
    CHOOSE_NOT_TO_USE_WARNINGS: {text: 'Choose Not To Use Warnings', id: 2}, 
    VIOLENCE: {text: 'Graphic Depictions Of Violence', id: 3}, 
    MAIN_CHARACTER_DEATH: {text: 'Major Character Death', id: 3}, 
    NO_WARNINGS_APPLY: {text: 'No Warnings Apply', id: 1}, 
    RAPE_NONCON: {text: 'Rape/Non-Con', id: 5}, 
    UNDERAGE: {text: 'Underage', id: 6}, 
}

export const CATEGORIES = {
    FF: {bigIcon: <FontAwesomeIcon icon={faVenusDouble} color='#f7b2ad' size="4x" />,
        smallIcon: <FontAwesomeIcon icon={faVenusDouble} color='#f7b2ad' size="2x"/>,
        text: 'F/F', class: 'ff', id: 2},
    FM: {bigIcon: <FontAwesomeIcon icon={faVenusMars} color='#55a630' size="4x" />, 
        smallIcon: <FontAwesomeIcon icon={faVenusMars} color='#55a630' size="2x" />,
        text: 'F/M', class: 'fm', id: 3},
    GEN: {bigIcon: <FontAwesomeIcon icon={faDragon} color='#5a189a' size="4x" />,
        smallIcon: <FontAwesomeIcon icon={faDragon} color='#5a189a' size="2x" />,
        text: 'Gen', class: 'gen', id: 1},
    MM: {bigIcon: <FontAwesomeIcon icon={faMarsDouble} color='#3a86ff' size="4x" />,
        smallIcon: <FontAwesomeIcon icon={faMarsDouble} color='#3a86ff' size="2x" />,
        text: 'M/M', class: 'mm', id: 4},
    MULTY: {bigIcon: <FontAwesomeIcon icon={faRandom} color='#ffbe0b' size="4x" />,
        smallIcon: <FontAwesomeIcon icon={faRandom} color='#ffbe0b' size="2x" />,
        text: 'Multy', class: 'multy', id: 5},
    OTHER: {bigIcon: <FontAwesomeIcon icon={faBullseye} color='#ccdbfd' size="4x"/>,
        smallIcon: <FontAwesomeIcon icon={faBullseye} color='#ccdbfd' size="2x"/>,
        text: 'Other', class: 'other', id: 6},
}

export const RATES = {
    NOT_RATED: {text: 'Not Rated', class: 'not-rated'},
    GENERAL_AUDIENCES: {text: 'General Audiences', class: 'general-audiences'},
    TEEN_AND_UP: {text: 'Teen And Up Audiences', class: 'teen-up'},
    MATURE: {text: 'Mature', class: 'mature'},
    EXPLICIT: {text: 'Explicit', class: 'explicit'},
}