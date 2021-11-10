import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {getWork, getChapter, getChapters} from '../actions';
import Loader from './Loader';
import WorkDescription from './WorkDescription';
import ReactMarkdown from 'react-markdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import queryString, { parseUrl } from 'query-string';

class Chapter extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        this.props.getWork(params.workId)
        this.props.getChapters(params.workId)

        const titleElement = document.getElementById('chapter-title')
        if(titleElement){
            titleElement.scrollIntoView()
        }
        
    }

    componentDidUpdate(prevProps) {
         let prevChapter = prevProps.match['params'].chapterId
         let newChapter = this.props.match['params'].chapterId

         if(prevChapter !== newChapter) {
            const titleElement = document.getElementById('chapter-title')
            if(titleElement){
                titleElement.scrollIntoView()
            }
        }
    }

    render() { 
        const {work, chapter, chapters, match: { params }} = this.props
        if (Object.keys(work).length === 0 || Object.keys(chapters).length === 0) {
            return <Loader/>
        } 
        
        
        let chapterIndex = 0;
        for(let i = 0; i < chapters.results.length; i++) {
            if (chapters.results[i].id == this.props.match.params.chapterId) {
                chapterIndex = i;
            }
        }

        let listLength = chapters.results.length - 1
        let nextChapter = chapterIndex + 1
        let previousChapter = chapterIndex - 1
        let nextLink = ' ';
        let previousLink = ' ';

        if (chapterIndex < listLength) {
            nextLink = <button type="button" className="btn next"><Link to={`/works/${work.id}/chapters/${chapters.results[nextChapter].id}`}>Next chapter</Link></button>
        }
        if (chapterIndex > 0) {
            previousLink = <button type="button" className="btn next"><Link to={`/works/${work.id}/chapters/${chapters.results[previousChapter].id}`}>Previous chapter</Link></button>
        }


        const currentUser = localStorage.getItem('currentUser');
        var editChapter;
        if(currentUser == work.user.id) {
            editChapter = <button className='edit-chapter'>
                <Link to={`/works/edit/${work.id}/chapters/${chapters.results[chapterIndex].id}`}><FontAwesomeIcon icon={faPencilAlt} color='#005C6E' size="1x" />Edit chapter</Link>
                </button>
        }

       

        
        return (
            <div>
                <WorkDescription workId={params.workId} work={work}/>
                
                <div className='row work-content'> 
                    <div>
                        <h5 id='chapter-title'>{chapters.results[chapterIndex].title}</h5>
                        <p className="chapter-text"><ReactMarkdown>{chapters.results[chapterIndex].text}</ReactMarkdown></p>
                        {editChapter}
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
    return {
        work: state.work,
        chapter: state.chapter,
        chapters: state.chapters,
    }
}

export default connect(mapStateToProps, {getWork, getChapter, getChapters}) (Chapter);