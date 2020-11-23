import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {WARNINGS, CATEGORIES, RATES} from '../constants'
import { format, parse } from 'date-fns'
import {getUser} from '../actions'


class Profile extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        this.props.getUser(params.userId)
        console.log('user params', params.userId)
    }

    render() { 
        return (
            <div>Profile</div>
        )
    }
}


function mapStateToProps(state) {
    console.log('======= user', state)
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, {getUser}) (Profile);