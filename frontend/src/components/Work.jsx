import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {WARNINGS, CATEGORIES, RATES} from '../constants';
import { format, parse } from 'date-fns';
import {getWork, getChapters} from '../actions';
import Loader from './Loader';
import WorkDescription from './WorkDescription';


class Work extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        this.props.getWork(params.workId)
        this.props.getChapters(params.workId)
        console.log('work params', params.workId)
    }

    render() { 
        const {work, chapters} = this.props
        if (Object.keys(work).length === 0) {
            return <Loader/>
        } 
        console.log('render work1111', work)

        return (
            <div>
                <WorkDescription work={work}/>
                
                <div className='row work-content'> 
                    <div>
                        {chapters.map(chapter => {
                            return(
                                <div key={chapter.id}>
                                    <h4><Link to={`/works/${work.id}/chapters/${chapter.id}`}>{chapter.title}</Link></h4>
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
    console.log('======= work wwwwww', state)
    return {
        work: state.work,
        chapters: state.chapters,
    }
}

export default connect(mapStateToProps, {getWork, getChapters}) (Work);