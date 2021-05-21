import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons'
// import { faHeart} from '@fortawesome/free-solid-svg-icons';
import {LikeWork, DidUserLiked, DeleteLike} from '../actions';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';

class Like extends Component {
    constructor(props) {
        super(props)
        this.state = {
        
        }
    }
    
    componentDidMount() {
        const currentUser = parseInt(localStorage.getItem('currentUser')); 
        this.props.DidUserLiked(this.props.workId, currentUser)
        
    }


    handleLikeWork() {
        const currentUser = parseInt(localStorage.getItem('currentUser'));
        this.props.LikeWork(this.props.workId, currentUser)
    }

    handleDeleteLike() {
        this.props.DeleteLike(this.props.usersLike.id, this.props.workId)
    }

    render() {
        let LikeButton;
        if(this.props.usersLike && this.props.usersLike.liked === true) {
            LikeButton = <button className='like-button' onClick={e => this.handleDeleteLike(e)}><FontAwesomeIcon icon={faHeartSolid} color='#005C6E' size="lg" data-toggle="tooltip" data-placement="top" title='Like work'/><span>{this.props.likes}</span></button>
        } else {
            LikeButton = <button className='like-button' onClick={e => this.handleLikeWork(e)}><FontAwesomeIcon icon={faHeart} color='#005C6E' size="lg" data-toggle="tooltip" data-placement="top" title='Like work'/><span>{this.props.likes}</span></button>
        }
        return(
            <div>{LikeButton}</div>
            
        )
    }

}

function mapStateToProps(state) {
    return {
        usersLike: state.getUsersLike,
    }
}

export default connect(mapStateToProps, {LikeWork, DidUserLiked, DeleteLike}) (Like);