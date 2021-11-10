import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {getUser, getWorksByUser} from '../actions';
import ListOfWorks from './ListOfWorks';
import { format, parse } from 'date-fns';
import Loader from './Loader';
import Pagination from './Pagination';
import queryString from 'query-string';


class Profile extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        const parsed = queryString.parse(this.props.location.search);
        this.props.getUser(params.userId);
        this.props.getWorksByUser(params.userId, parsed.page)
    }

    componentDidUpdate(prevProps) {
        let prevPage = queryString.parse(prevProps.location.search).page
        let newPage = queryString.parse(this.props.location.search).page
        const { match: { params } } = this.props;
        if(prevPage !== newPage) {
            this.props.getWorksByUser(params.userId, newPage)
            window.scrollTo(0, 0)
        }
    }

    render() { 
        const parsed = queryString.parse(this.props.location.search);
        const {user, works} = this.props;
        if (Object.keys(user).length === 0 || Object.keys(works).length === 0) {
            return <Loader/>
        };

        const currentUser = localStorage.getItem('currentUser');
        var newWorkButton;
        if(currentUser == user.id) {
            newWorkButton = <button className='add-new-work'><Link to={"/works/add"}> Add new work</Link></button>;
        }

        return (
            <div>
                <div className='user-info-container'>
                    <div className='user-pic'><img className='user-img' src='/quill-drawing-a-line.svg' /></div>
                    <div className='user-info'>
                        <h2>{user.username}</h2>
                        <p>Joined: {format(new Date(user.date_joined), 'yyyy-MM-dd')}</p>
                        {newWorkButton}
                    </div>
                    
                </div>
                
                <ListOfWorks works={works.results} name='user'/>
                <Pagination 
                    count={works.count}
                    page={parsed.page}
                />
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        user: state.user,
        works: state.worksByUser
    }
}

export default connect(mapStateToProps, {getUser, getWorksByUser}) (Profile);