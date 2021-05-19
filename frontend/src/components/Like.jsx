import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons'
// import { faHeart} from '@fortawesome/free-solid-svg-icons';
import {LikeWork, DidUserLiked} from '../actions';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';

class Like extends Component {
    constructor(props) {
        super(props)
        this.state = {
            liked: props.usersLike || false,
        }
    }
    
    componentDidMount() {
        const currentUser = parseInt(localStorage.getItem('currentUser')); 
        this.props.DidUserLiked(this.props.workId, currentUser)
        
    }

    componentDidUpdate(prevProps) {
        if(this.props.usersLike !== prevProps.usersLike) {
            this.setState({liked: this.props.usersLike})
        } 
    }

    render() {
        let LikeButton;
        if(this.state.liked === true) {
            LikeButton = <button className='like-button'><FontAwesomeIcon icon={faHeartSolid} color='#005C6E' size="lg" data-toggle="tooltip" data-placement="top" title='Like work'/><span>{this.props.likes}</span></button>
        } else {
            LikeButton = <button className='like-button'><FontAwesomeIcon icon={faHeart} color='#005C6E' size="lg" data-toggle="tooltip" data-placement="top" title='Like work'/><span>{this.props.likes}</span></button>
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

export default connect(mapStateToProps, {LikeWork, DidUserLiked}) (Like);