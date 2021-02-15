import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {getWorks, getFandomCategories} from '../actions';

class Home extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getFandomCategories()
        this.props.getWorks()
        
    }

    render() {
        console.log(this.props.fandomCategories)
        const {fandomCategories} = this.props
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
                <div className='new-block'>new block</div>
            </div>
            
        )
    }
}


function mapStateToProps(state) {
    console.log('=======', state)
    return {
        works: state.works,
        fandomCategories: state.fandomCategories
    }
}

export default connect(mapStateToProps, {getWorks, getFandomCategories}) (Home);