import React, { Component } from 'react';
import {getListOfWorksByFandom, getFandom} from '../actions';
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
        this.props.getFandom(params.fandomId)
        console.log('props', this.props)
        window.scrollTo(0, 0)
    }

    componentDidUpdate(prevProps) {
        let prevPage = queryString.parse(prevProps.location.search).page
        let newPage = queryString.parse(this.props.location.search).page
        const { match: { params } } = this.props;
        if(prevPage !== newPage) {
            this.props.getListOfWorksByFandom(params.fandomId, newPage)
            window.scrollTo(0, 0)
        }
    }

    render() {
        const parsed = queryString.parse(this.props.location.search);
        const {works, fandom} = this.props
        if (Object.keys(works).length === 0) {
            return <Loader/>
        }
    
        return(
            <div>
                <h2 className='works-in-fandom-title'>Works in {fandom['name']} fandom</h2>
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
        works: state.worksByFandom,
        fandom: state.getFandom
    }
}

export default connect(mapStateToProps, {getListOfWorksByFandom, getFandom}) (WorksByFandom);