import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-regular-svg-icons'
// import { faHeart} from '@fortawesome/free-solid-svg-icons';
import {BookmarkWork, DidUserBookmarked, DeleteBookmark} from '../actions';
import { faBookmark as faBookmarkSolid } from '@fortawesome/free-solid-svg-icons';

class Bookmark extends Component {
    constructor(props) {
        super(props)
        this.state = {
        
        }
    }
    
    componentDidMount() {
        const currentUser = parseInt(localStorage.getItem('currentUser')); 
        this.props.DidUserBookmarked(this.props.workId, currentUser)
        
    }


    handleBookmarkWork() {
        const currentUser = parseInt(localStorage.getItem('currentUser'));
        this.props.BookmarkWork(this.props.workId, currentUser)
    }

    handleDeleteBookmark() {
        this.props.DeleteBookmark(this.props.usersBookmark.id, this.props.workId)
    }

    render() {
        let BookmarkButton;
        if(this.props.usersBookmark && this.props.usersBookmark.bookmarked === true) {
            BookmarkButton = <button className='bookmark-button' onClick={e => this.handleDeleteBookmark(e)}><FontAwesomeIcon icon={faBookmarkSolid} color='#005C6E' size="lg" data-toggle="tooltip" data-placement="top" title='Bookmark work'/><span>{this.props.bookmarks}</span></button>
        } else {
            BookmarkButton = <button className='bookmark-button' onClick={e => this.handleBookmarkWork(e)}><FontAwesomeIcon icon={faBookmark} color='#005C6E' size="lg" data-toggle="tooltip" data-placement="top" title='Bookmark work'/><span>{this.props.bookmarks}</span></button>
        }
        return(
            <div>{BookmarkButton}</div>
            
        )
    }

}

function mapStateToProps(state) {
    return {
        usersBookmark: state.getUsersBookmark,
    }
}

export default connect(mapStateToProps, {BookmarkWork, DidUserBookmarked, DeleteBookmark}) (Bookmark);