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
        const { match: { params } } = this.props;
        const parsed = queryString.parse(this.props.location.search);
        this.props.getWorks({page: parsed.page, search: parsed.search})
    }


    componentDidUpdate(prevProps) {

        const parsed = queryString.parse(this.props.location.search);
        
        let prevPage = queryString.parse(prevProps.location.search).page
        let newPage = queryString.parse(this.props.location.search).page
        if(prevPage !== newPage) {
            this.props.getWorks({page: newPage, search: parsed.search})
            window.scrollTo(0, 0)
        }

        let prevSearch = queryString.parse(prevProps.location.search).search
        let newSearch = queryString.parse(this.props.location.search).search
        if(prevSearch !== newSearch) {
            this.props.getWorks({search: newSearch})
            window.scrollTo(0, 0)
        }

    }


    render() {
        const parsed = queryString.parse(this.props.location.search);
        if (Object.keys(this.props.works).length === 0) {
            return <Loader/>
        }
    
        return(
            <div className='all-works-main'>
                <h2 className='all-works-title'>{parsed.search === undefined ? 'All works' : `Search results for "${parsed.search}"`}</h2>
                <ListOfWorks works={this.props.works.results}/>
                <Pagination count={this.props.works.count} page={parsed.page} search={parsed.search}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        works: state.works,
    }
}

export default connect(mapStateToProps, {getWorks}) (AllWorks);