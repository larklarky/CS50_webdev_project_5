import React, { Component } from 'react';
import { connect } from 'react-redux';
import {UsersBookmarks} from '../actions';
import ListOfWorks from './ListOfWorks';
import Loader from './Loader';


class UserBookmarks extends Component {

    componentDidMount() {
        const currentUser = parseInt(localStorage.getItem('currentUser'));
        this.props.UsersBookmarks(currentUser)

    }


    render() {
        
        if (Object.keys(this.props.bookmarks).length === 0) {
            return <Loader/>
        }
        let works = this.props.bookmarks.results.map(item =>{
            return item.work
        })

        let currentUser = this.props.currentUser


        return(
            <div className='bookmarks-list-container'>
                <h3>Bookmarks by {currentUser.username} </h3>
                <ListOfWorks works={works} name='bookmarks'/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    // console.log('======= bookmarks list', state)
    return {
        bookmarks: state.usersBookmarks,
        currentUser:state.currentUser
    }
}

export default connect(mapStateToProps, {UsersBookmarks}) (UserBookmarks);