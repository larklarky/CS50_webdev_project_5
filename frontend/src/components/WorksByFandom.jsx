import React, { Component } from 'react';
import {getListOfWorksByFandom} from '../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {WARNINGS, CATEGORIES, RATES} from '../constants';
import { format, parse } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMarsDouble } from '@fortawesome/free-solid-svg-icons'
import ListOfWorks from './ListOfWorks';
import Loader from './Loader';
import Pagination from './Pagination';
import queryString from 'query-string';

class WorksByFandom extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        const parsed = queryString.parse(this.props.location.search);
        this.props.getListOfWorksByFandom(params.fandomId, parsed.page)
    }

    componentDidUpdate(prevProps) {
        let prevPage = queryString.parse(prevProps.location.search).page
        let newPage = queryString.parse(this.props.location.search).page
        const { match: { params } } = this.props;
        if(prevPage !== newPage) {
            this.props.getListOfWorksByFandom(params.fandomId, newPage)
        }
    }

    render() {
        const parsed = queryString.parse(this.props.location.search);
        const {works} = this.props
        if (Object.keys(works).length === 0) {
            return <Loader/>
        } 

        return(
            <div>
                <ListOfWorks works={works.results} name='fandom'/>
                <Pagination 
                    count={works.count}
                    page={parsed.page}
                />
            </div>
        )
    }
}



function mapStateToProps(state) {
    console.log('======= works', state)
    return {
        works: state.worksByFandom
    }
}

export default connect(mapStateToProps, {getListOfWorksByFandom}) (WorksByFandom);