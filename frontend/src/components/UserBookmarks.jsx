import React, { Component } from 'react';
import { connect } from 'react-redux';
import {UsersBookmarks} from '../actions';
import ListOfWorks from './ListOfWorks';
import Loader from './Loader';
import Pagination from './Pagination';
import queryString from 'query-string';


class UserBookmarks extends Component {

    componentDidMount() {
        const currentUser = parseInt(localStorage.getItem('currentUser'));
        const parsed = queryString.parse(this.props.location.search);
        this.props.UsersBookmarks(currentUser, parsed.page)

    }

    componentDidUpdate(prevProps) {
        let prevPage = queryString.parse(prevProps.location.search).page
        let newPage = queryString.parse(this.props.location.search).page
        const currentUser = parseInt(localStorage.getItem('currentUser'));
        if(prevPage !== newPage) {
            this.props.UsersBookmarks(currentUser, newPage)
            window.scrollTo(0, 0)
        }
    }


    render() {
        
        const parsed = queryString.parse(this.props.location.search);
        if (Object.keys(this.props.bookmarks).length === 0) {
            return <Loader/>
        }
        let works = this.props.bookmarks.results.map(item =>{
            return item.work
        })

        let currentUser = this.props.currentUser


        return(
            <div className='bookmarks-list-container'>
                <h3 className='user-bookmarks-title'>Bookmarks by {currentUser.username} </h3>
                <ListOfWorks works={works} name='bookmarks'/>
                <Pagination 
                    count={this.props.bookmarks.count}
                    page={parsed.page}
                />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        bookmarks: state.usersBookmarks,
        currentUser:state.currentUser,
    }
}

export default connect(mapStateToProps, {UsersBookmarks}) (UserBookmarks);