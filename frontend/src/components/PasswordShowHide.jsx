import React, { Component } from 'react';


class PasswordShowHide extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hidden: true,
        } 
        this.toggleShow = this.toggleShow.bind(this); 
    }

    toggleShow() {
        this.setState({ hidden: !this.state.hidden });
    }
    

    render() {
        return(
            <div className='password-switch-group'>
                <input
                    placeholder ={this.props.placeholder}
                    className={this.props.className}
                    type={this.state.hidden ? "password" : "text"}
                    value={this.props.password}
                    onChange={this.props.onChange}
                    />
                    <div className='password-toggle'>
                        <input className='password'type='checkbox' onClick={this.toggleShow}/>
                        <label>Show password</label>
                    </div>
            </div>
        )
    }
}

export default PasswordShowHide;