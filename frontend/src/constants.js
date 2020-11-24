import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMarsDouble, faVenusDouble, faVenusMars, faRandom, faGenderless, faBroom, faDragon, faFly, faBullseye, faCircle, faDotCircle } from '@fortawesome/free-solid-svg-icons'


export const RECIEVED_WORKS = 'RECIEVED_WORKS';
export const RECIEVED_CATEGORIES = 'RECIEVED_CATEGORIES';
export const RECIEVED_FANDOMS_BY_CATEGORY = 'RECIEVED_FANDOMS_BY_CATEGORY';
export const RECIEVED_WORKS_BY_FANDOM = 'RECIEVED_WORKS_BY_FANDOM';
export const RECIEVED_WORKS_BY_USER = 'RECIEVED_WORKS_BY_USER';
export const GET_USER = 'GET_USER';
export const GET_WORK = 'GET_WORK';


export const WARNINGS = {
    CHOOSE_NOT_TO_USE_WARNINGS: 'Choose Not To Use Warnings',
    VIOLENCE: 'Graphic Depictions Of Violence',
    MAIN_CHARACTER_DEATH: 'Major Character Death',
    NO_WARNINGS_APPLY: 'No Warnings Apply',
    RAPE_NONCON: 'Rape/Non-Con',
    UNDERAGE: 'Underage',
}

export const CATEGORIES = {
    FF: <FontAwesomeIcon icon={faVenusDouble} color='#f7b2ad' size="4x" />,
    FM: <FontAwesomeIcon icon={faVenusMars} color='#55a630' size="4x" />,
    GEN: <FontAwesomeIcon icon={faDragon} color='#5a189a' size="4x" />,
    MM: <FontAwesomeIcon icon={faMarsDouble} color='#3a86ff' size="4x" />,
    MULTY: <FontAwesomeIcon icon={faRandom} color='#ffbe0b' size="4x" />,
    OTHER: <FontAwesomeIcon icon={faBullseye} color='#ccdbfd' size="4x"/>,
}

export const RATES = {
    NOT_RATED: 'Not Rated',
    GENERAL_AUDIENCES: 'General Audiences',
    TEEN_AND_UP: 'Teen And Up Audiences',
    MATURE: 'Mature',
    EXPLICIT: 'Explicit',
}