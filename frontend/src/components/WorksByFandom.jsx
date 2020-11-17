import React, { Component } from 'react';
import {getListOfWorksByFandom} from '../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

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
        console.log('works', this.props.works)
        const {works} = this.props
        return(
            <div>
                <div>works</div>
                <div className='works-by-fandom-container'>
                    {works.map(work => {
                        return (
                        <div key={work.id}>
                            <Link to={`/works/${work.id}`}>{work.title}</Link>
                        </div>

                        )
                    })}

                </div>
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