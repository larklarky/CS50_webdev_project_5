import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {getUser, getWorksByUser} from '../actions';
import ListOfWorks from './ListOfWorks';
import { format, parse } from 'date-fns';
import Loader from './Loader';


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
        if (Object.keys(user).length === 0 || works.length === 0) {
            return <Loader/>
        };

        return (
            <div>
                <div className='user-info-container'>
                    <div className='user-pic'><img className='user-img' src='/quill-drawing-a-line.svg' /></div>
                    <div className='user-info'>
                        <h2>{user.username}</h2>
                        <p>Joined: {format(new Date(user.date_joined), 'yyyy-MM-dd')}</p>
                    </div>
                    
                </div>
                
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