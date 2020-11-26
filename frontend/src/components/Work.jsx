import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {WARNINGS, CATEGORIES, RATES} from '../constants'
import { format, parse } from 'date-fns'
import {getWork, getChapters} from '../actions'


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
            // console.log('if work', work)
            return (<div>Something went wrong</div>)
        } 
        console.log('render work1111', work)
        return (
            <div>
                <div className='row work-information-card'>
                    <div className='information-container'>
                        <h3>
                            <Link to={`/works/${work.id}`}>{work.title}</Link> by <Link to={`/users/${work.user.id}`}>{work.user.username}</Link>
                        </h3>
                        <h6>Fandoms: {work.fandoms.map(fandom => {
                                return (fandom.name)}).join(', ')}
                        </h6>
                        <div className={'badge' + ' ' + 'category-badge' + " " + work.categories.map(category =>{
                                return(CATEGORIES[category.name].class)})} >
                            <span>{work.categories.map(category =>{
                                return(CATEGORIES[category.name].smallIcon)})} &nbsp;
                            </span>
                            <span>{work.categories.map(category =>{
                                return(CATEGORIES[category.name].text)})}
                            </span>
                        </div>
                        
                        <span className={'badge' + ' ' + RATES[work.rating].class}>{RATES[work.rating].text}</span>
                        <span className={work.completed ? 'badge work-status-finished' : 'badge work-status-process'}>
                            {work.completed ? 'Finished' : 'In a process'}
                        </span>
                        <div className='work-description'>
                            <p>{work.description}</p>
                            <p>Last update: {format(new Date(work.date_modified), 'yyyy-MM-dd')}</p>
                        </div>
                        
                    </div>
                    
                </div>
                <div className='row work-content'> 
                    {chapters.map(chapter => {
                        return(
                        <div key={chapter.id}>{chapter.title}</div>
                        )
                    })}
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