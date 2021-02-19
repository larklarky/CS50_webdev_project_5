import React, { Component } from 'react';
import {getListOfFandomsByCategory, getFandomCategories} from '../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from './Loader';

class FandomsByCategory extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        this.props.getListOfFandomsByCategory(params.categoryId)
        this.props.getFandomCategories()
        console.log('params', params.categoryId)
    }

    componentDidUpdate(prevProps) {
        if(this.props.match.params.categoryId !== prevProps.match.params.categoryId) {
            this.props.getListOfFandomsByCategory(this.props.match.params.categoryId)
        }
    }

    render() {
        console.log('fandoms', this.props.fandoms)
        const {fandoms, fandomCategories, match: { params }} = this.props

        if (Object.keys(fandoms).length === 0 || Object.keys(fandomCategories).length === 0) {
            return <Loader/>
        } 
        return(
            <div className='main-grid'>
                <div className='fandom-categories-container'>
                    <h2 className='fandom-category-header'>Categories</h2>
                    {fandomCategories.map(category => {
                        return (
                            <div className={params.categoryId == category.id ? 'fandom-category-item-selected' : 'fandom-category-item'} key={category.id}>
                                <Link to={`/fandom_categories/${category.id}`}>{category.name}</Link>
                            </div>
                        )
                    })}

                </div>
                <div className='fandoms-list-container'>
                    <h2 className='fandom-category-header'>Fandoms</h2>
                    <div className='fandoms-by-category-container'>
                        {fandoms.results.map(fandom => {
                            return (
                            <div className='fandom-by-category-item' key={fandom.id}>
                                <Link to={`/fandoms/${fandom.id}/works`}>{fandom.name}</Link>
                            </div>

                            )
                        })}

                    </div>
                </div>
            </div>
        )
    }
}



function mapStateToProps(state) {
    console.log('=======', state)
    return {
        fandoms: state.fandomsByCategory,
        fandomCategories: state.fandomCategories,
    }
}

export default connect(mapStateToProps, {getListOfFandomsByCategory, getFandomCategories}) (FandomsByCategory);