import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {getWorks} from '../actions';
import ListOfWorks from './ListOfWorks';
import Loader from './Loader';
import Pagination from './Pagination';
import queryString, { parseUrl } from 'query-string';


class AllWorks extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log('all works props', this.props )
        const { match: { params } } = this.props;
        const parsed = queryString.parse(this.props.location.search);
        this.props.getWorks(parsed.page, parsed.search)
    }


    componentDidUpdate(prevProps) {
        console.log('all works prevProps', prevProps)
        console.log('all works newProps', this.props)
        
        let prevPage = queryString.parse(prevProps.location.search).page
        let newPage = queryString.parse(this.props.location.search).page

        if(prevPage !== newPage) {
            this.props.getWorks(newPage)
        }

        let prevSearch = queryString.parse(prevProps.location.search).search
        let newSearch = queryString.parse(this.props.location.search).search
        if(prevSearch !== newSearch) {
            this.props.getWorks(1, newSearch)
        }

    }


    render() {
        const parsed = queryString.parse(this.props.location.search);
        if (Object.keys(this.props.works).length === 0) {
            return <Loader/>
        }
        console.log('parsed search', parsed.search)
        return(
            <div className='all-works-main'>
                <h3>{parsed.search === undefined ? 'All works' : `Search results for "${parsed.search}"`}</h3>
                <ListOfWorks works={this.props.works.results}/>
                <Pagination count={this.props.works.count} page={parsed.page}/>
                
            </div>
        )
    }
}

function mapStateToProps(state) {
    console.log('=======ghghghg', state)
    return {
        works: state.works,
    }
}

export default connect(mapStateToProps, {getWorks}) (AllWorks);