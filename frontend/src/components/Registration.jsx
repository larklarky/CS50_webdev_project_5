import React, { Component } from 'react';
import { connect } from 'react-redux';
import PasswordShowHide from './PasswordShowHide';
import {SignUp, ClearErrorMessage} from '../actions';
import registration from '../reducers/registration';
import errorMessage from '../reducers/errorMessage';

class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            passwordMismatched: false, 
        }
    }

    handleSignUp(e) {
        e.preventDefault()
        const {username, email, password, confirmPassword} = this.state;
        if (password !== confirmPassword) {
            this.setState({passwordMismatched: true})
            this.setState({password: '', confirmPassword: ''})
        } else {
            this.props.SignUp(username, email, password)

        }
        
    }

    componentWillUnmount() {
        this.props.ClearErrorMessage()
    }

    render() {
        const {passwordMismatched} = this.state;
        let error;
        
        if(passwordMismatched){
            error = <div className='error-message'>Your passwords should match</div>
        }
        
        return(
            <div className='main'>
                
                <div className='authorization-container'>
                    <h1 className="login-header">SignUp form</h1>
                    <form className='form-group'>
                        {error}
                        <input 
                            type='text' 
                            placeholder='Username'
                            value={this.state.username}
                            onChange={(e) => this.setState({username: e.target.value})}
                        />
                        <input 
                            type='text' 
                            placeholder='Email'
                            value={this.state.email}
                            onChange={(e) => this.setState({email: e.target.value})}
                        />
                        <input
                            placeholder='Password'
                            type='password'
                            className={this.state.passwordMismatched ? 'password-input-red' : 'password-input'}
                            value={this.state.password}
                            onChange = {(e) => this.setState({password: e.target.value, passwordMismatched: false})}
                        />
                        <input
                            placeholder='Confirm Password'
                            type='password'
                            className={this.state.passwordMismatched ? 'password-input-red' : 'password-input'}
                            value={this.state.confirmPassword}
                            onChange = {(e) => this.setState({confirmPassword: e.target.value, passwordMismatched: false})}
                        />
                        <button 
                            disabled={this.state.password.length === 0 
                                || this.state.confirmPassword.length === 0
                                || this.state.username.length === 0
                                || this.state.email.length === 0
                                ? true : false} 
                            onClick={(e) => this.handleSignUp(e)}
                        >
                            Sign Up
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
        error: state.errorMessage,
    }
}


export default connect(mapStateToProps, {SignUp, ClearErrorMessage}) (Registration);