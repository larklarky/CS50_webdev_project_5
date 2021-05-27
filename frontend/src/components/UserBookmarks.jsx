import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {getUser, getWorksByUser} from '../actions';
import ListOfWorks from './ListOfWorks';
import { format, parse } from 'date-fns';
import Loader from './Loader';


class UserBookmarks extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div>
                <h3>Bookmarks</h3>
            </div>
        )
    }


}

function mapStateToProps(state) {
    // console.log('======= user', state)
    return {
        user: state.user,
        works: state.worksByUser
    }
}

export default connect(mapStateToProps, {getUser, getWorksByUser}) (UserBookmarks);