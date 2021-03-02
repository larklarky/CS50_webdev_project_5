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
export const GET_TOKEN = 'GET_TOKEN';
export const REGISTRATION  = 'REGISTRATION';
export const ERROR_MESSAGE = 'ERROR_MESSAGE';
export const LOGOUT = 'LOGOUT';


export const WARNINGS = {
    CHOOSE_NOT_TO_USE_WARNINGS: 'Choose Not To Use Warnings',
    VIOLENCE: 'Graphic Depictions Of Violence',
    MAIN_CHARACTER_DEATH: 'Major Character Death',
    NO_WARNINGS_APPLY: 'No Warnings Apply',
    RAPE_NONCON: 'Rape/Non-Con',
    UNDERAGE: 'Underage',
}

export const CATEGORIES = {
    FF: {bigIcon: <FontAwesomeIcon icon={faVenusDouble} color='#f7b2ad' size="4x" />,
        smallIcon: <FontAwesomeIcon icon={faVenusDouble} color='#f7b2ad' size="2x"/>,
        text: 'F/F', class: 'ff'},
    FM: {bigIcon: <FontAwesomeIcon icon={faVenusMars} color='#55a630' size="4x" />, 
        smallIcon: <FontAwesomeIcon icon={faVenusMars} color='#55a630' size="2x" />,
        text: 'F/M', class: 'fm'},
    GEN: {bigIcon: <FontAwesomeIcon icon={faDragon} color='#5a189a' size="4x" />,
        smallIcon: <FontAwesomeIcon icon={faDragon} color='#5a189a' size="2x" />,
        text: 'Gen', class: 'gen'},
    MM: {bigIcon: <FontAwesomeIcon icon={faMarsDouble} color='#3a86ff' size="4x" />,
        smallIcon: <FontAwesomeIcon icon={faMarsDouble} color='#3a86ff' size="2x" />,
        text: 'M/M', class: 'mm'},
    MULTY: {bigIcon: <FontAwesomeIcon icon={faRandom} color='#ffbe0b' size="4x" />,
        smallIcon: <FontAwesomeIcon icon={faRandom} color='#ffbe0b' size="2x" />,
        text: 'Multy', class: 'multy'},
    OTHER: {bigIcon: <FontAwesomeIcon icon={faBullseye} color='#ccdbfd' size="4x"/>,
        smallIcon: <FontAwesomeIcon icon={faBullseye} color='#ccdbfd' size="2x"/>,
        text: 'Other', class: 'other'},
}

export const RATES = {
    NOT_RATED: {text: 'Not Rated', class: 'not-rated'},
    GENERAL_AUDIENCES: {text: 'General Audiences', class: 'general-audiences'},
    TEEN_AND_UP: {text: 'Teen And Up Audiences', class: 'teen-up'},
    MATURE: {text: 'Mature', class: 'mature'},
    EXPLICIT: {text: 'Explicit', class: 'explicit'},
}