import React, { Component } from 'react';
import { connect } from 'react-redux';
import {getToken} from '../actions'
import PasswordShowHide from './PasswordShowHide';


class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
        };
    }

    handleLogin(e) {
        e.preventDefault()
        const {username, password} = this.state;
        this.props.getToken(username, password)
    }



    render() {
        const {errorMessage} = this.props;
        let error;
        console.log('error length', this.props)
        if(Object.keys(errorMessage).length !== 0) {
            error = <div className='error-message'>{errorMessage.non_field_errors[0]}</div>
        }
        return(
            <div className='main'>
                <div className='authorization-container'>
                    <h1 className="login-header">Login form</h1>
                    <form className='form-group'>
                        {error}
                        <input 
                            type='text' 
                            placeholder='Username'
                            value={this.state.username}
                            onChange={(e) => this.setState({username: e.target.value})}
                        />
                        <PasswordShowHide
                            placeholder ='Password'
                            className='password-input'
                            value={this.state.password}
                            onChange = {(e) => this.setState({password: e.target.value})}
                        />
                        <button 
                            disabled={this.state.password.length === 0 || this.state.username.length === 0 ? true : false} 
                            onClick={(e) => this.handleLogin(e)}
                        >
                            Log In
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}


function mapStateToProps(state) {
    console.log('======= token', state)
    return {
        token: state.token,
        errorMessage: state.errorMessage,
    }
}


export default connect(mapStateToProps, {getToken}) (Login);