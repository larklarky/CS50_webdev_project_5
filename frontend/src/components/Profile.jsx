import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {getUser, getWorksByUser} from '../actions';
import ListOfWorks from './ListOfWorks';


class Profile extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        this.props.getUser(params.userId);
        this.props.getWorksByUser(params.userId)
        console.log('user params', params.userId)
    }

    render() { 
        console.log('>>>> this.props', this.props.works)
        const {user, works} = this.props;
        return (
            <div>
                <div className='user-pic'><img className='user-img' src='/quill-drawing-a-line.svg' /></div>
                <h2>{user.username}</h2>
                <ListOfWorks works={works} name='user'/>
            </div>
        )
    }
}


function mapStateToProps(state) {
    console.log('======= user', state)
    return {
        user: state.user,
        works: state.worksByUser
    }
}

export default connect(mapStateToProps, {getUser, getWorksByUser}) (Profile);