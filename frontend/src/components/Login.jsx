import React, { Component } from 'react';
import { connect } from 'react-redux';
import {getToken} from '../actions'
import token from '../reducers/token';
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
        
        return(
            <div className='main'>
                <div className='authorization-container'>
                    <form className='form-group'>
                        <input 
                            type='text' 
                            placeholder='Username'
                            value={this.state.username}
                            onChange={(e) => this.setState({username: e.target.value})}
                        />
                        {/* <input 
                            type='password' 
                            placeholder='Password'
                            value={this.state.password}
                            onChange={(e) => this.setState({password: e.target.value})}
                        /> */}
                        <PasswordShowHide
                            placeholder ='Password'
                            className='password-input'
                            value={this.state.password}
                            onChange = {(e) => this.setState({password: e.target.value})}
                        />
                        <button onClick={(e) => this.handleLogin(e)}>Log In</button>
                    </form>
                </div>
            </div>
        )
    }
}


function mapStateToProps(state) {
    console.log('======= token', state)
    return {
        token: token,
    }
}


export default connect(mapStateToProps, {getToken}) (Login);