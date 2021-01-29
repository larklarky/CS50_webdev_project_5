import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {WARNINGS, CATEGORIES, RATES} from '../constants';
import { format, parse } from 'date-fns';
import {getWork, getChapter, getChapters} from '../actions';
import Loader from './Loader';
import WorkDescription from './WorkDescription';


class Chapter extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        this.props.getWork(params.workId)
        // this.props.getChapter(params.chapterId)
        this.props.getChapters(params.workId)
        console.log('work params', params.workId)
        console.log('chaper id params', params.chapterId)
    }

    render() { 
        const {work, chapter, chapters} = this.props
        if (Object.keys(work).length === 0 || Object.keys(chapters).length === 0) {
            return <Loader/>
        } 
        

        let chapterIndex = 0;
        for(let i = 0; i < chapters.length; i++) {
            if (chapters[i].id == this.props.match.params.chapterId) {
                chapterIndex = i;
            }
        }

        let listLength = chapters.length - 1
        let nextChapter = chapterIndex + 1
        let previousChapter = chapterIndex - 1
        let nextLink = ' ';
        let previousLink = ' ';

        if (chapterIndex < listLength) {
            nextLink = <button type="button" className="btn next"><Link to={`/works/${work.id}/chapters/${chapters[nextChapter].id}`}>Next chapter</Link></button>
        }
        if (chapterIndex > 0) {
            previousLink = <button type="button" className="btn next"><Link to={`/works/${work.id}/chapters/${chapters[previousChapter].id}`}>Previous chapter</Link></button>
        }
        
        return (
            <div>
                <WorkDescription work={work}/>
                
                <div className='row work-content'> 
                    <div>
                    <h5>{chapters[chapterIndex].title}</h5>
                    <p className="chapter-text">{chapters[chapterIndex].text}</p>
                    </div>
                </div>
                <div>
                    {previousLink}
                    {nextLink}
                </div>

            </div>
        )
    }
}


function mapStateToProps(state) {
    console.log('======= chapter wwwwww', state)
    return {
        work: state.work,
        chapter: state.chapter,
        chapters: state.chapters,
    }
}

export default connect(mapStateToProps, {getWork, getChapter, getChapters}) (Chapter);