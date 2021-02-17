import React, { Component } from 'react';
import {getListOfFandomsByCategory} from '../actions';
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
        console.log('params', params.categoryId)
    }

    render() {
        console.log('fandoms', this.props.fandoms)
        const {fandoms} = this.props
        if (Object.keys(fandoms).length === 0) {
            return <Loader/>
        } 
        return(
            <div>
                <div>Fandoms</div>
                <div className='fandoms-by-category-container'>
                    {fandoms.results.map(fandom => {
                        return (
                        <div key={fandom.id}>
                            <Link to={`/fandoms/${fandom.id}/works`}>{fandom.name}</Link>
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
        fandoms: state.fandomsByCategory
    }
}

export default connect(mapStateToProps, {getListOfFandomsByCategory}) (FandomsByCategory);