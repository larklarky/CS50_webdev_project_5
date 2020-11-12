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
            <div>
                <div>Home</div>
                <div className='fandom-categories-container'>
                    {fandomCategories.map(category => {
                        return (
                        <div key={category.id}>
                            <Link to={`/fandom_categories/${category.id}`}>{category.name}</Link>
                        </div>

                        )
                    })}

                </div>
                
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