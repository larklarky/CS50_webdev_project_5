import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {getWorks, getFandomCategories} from '../actions';
import ListOfWorks from './ListOfWorks';
import Loader from './Loader';
import Pagination from './Pagination';
import queryString from 'query-string';

class Home extends Component {
    constructor(props) {
        super(props);
    }

    

    componentDidMount() {
        const parsed = queryString.parse(this.props.location.search);
        this.props.getFandomCategories()
        this.props.getWorks(parsed.page)
        
    }

    componentDidUpdate(prevProps) {
        let prevPage = queryString.parse(prevProps.location.search).page
        let newPage = queryString.parse(this.props.location.search).page
        if(prevPage !== newPage) {
            this.props.getWorks(newPage)
        }
    }

    render() {
        const parsed = queryString.parse(this.props.location.search);
        const {fandomCategories, works} = this.props
        if (Object.keys(works).length === 0 || Object.keys(fandomCategories).length === 0) {
            return <Loader/>
        } 
        return(
            <div className='main-grid'>
                <div className='fandom-categories-container'>
                    <h2 className='fandom-category-header'>Categories</h2>
                    {fandomCategories.map(category => {
                        return (
                            <div className='fandom-category-item' key={category.id}>
                                <Link to={`/fandom_categories/${category.id}`}>{category.name}</Link>
                            </div>
                        )
                    })}

                </div>
                <div className='recent-works-container'>
                    <h2 className='fandom-category-header'>Recent works</h2>
                    <ListOfWorks works={works.results} name='date'/>
                    <Pagination 
                        count={works.count}
                        page={parsed.page}
                    />
                </div>
                
            </div>
            
        )
    }
}


function mapStateToProps(state) {
    console.log('=======ghghghg', state)
    return {
        works: state.works,
        fandomCategories: state.fandomCategories,
        currentUser: state.currentUser,
    }
}

export default connect(mapStateToProps, {getWorks, getFandomCategories}) (Home);