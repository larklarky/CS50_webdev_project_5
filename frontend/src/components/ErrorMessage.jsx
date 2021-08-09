import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import {ClearErrorMessage} from '../actions';


const ErrorMessage = (props) => {
    
    const {errorMessage, ClearError} = props;

    useEffect(() => {
        const timeout = setTimeout(() => {
            ClearError()
        }, 6000)
        return () => clearTimeout(timeout);
    }, [])

    return(
        <div className="error-message-container">
            <div className='error-message-main'>
            <span className='error-text'>{errorMessage}</span>
            <span className='error-button' onClick={ClearError}><FontAwesomeIcon icon={faTimes} size='1x' color='#721c24'/></span>
        </div>
    
        </div>
    )
    
}

function mapStateToProps(state) {
    return {
    }
}

export default connect(mapStateToProps, {'ClearError': ClearErrorMessage}) (ErrorMessage);