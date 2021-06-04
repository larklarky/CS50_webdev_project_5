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

class WorksByFandom extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        this.props.getListOfWorksByFandom(params.fandomId)
        console.log('works params', params.fandomId)
    }

    render() {
        const {works} = this.props
        if (Object.keys(works).length === 0) {
            return <Loader/>
        } 

        return(
            <div>
                <ListOfWorks works={works.results} name='fandom'/>
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