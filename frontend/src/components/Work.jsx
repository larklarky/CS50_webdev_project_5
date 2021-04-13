import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {getWork, getChapters} from '../actions';
import Loader from './Loader';
import WorkDescription from './WorkDescription';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';


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

        const currentUser = localStorage.getItem('currentUser');
        var addNewChapter;
        if(currentUser == work.user.id) {
            addNewChapter = <button className='add-new-chapter'>
                <Link to={`/works/add/${work.id}/chapter`}><FontAwesomeIcon icon={faPlus} color='#005C6E' size="1x" />Add new chapter</Link>
                </button>
        }

        return (
            <div>
                <WorkDescription work={work}/>
                
                <div className='row work-content'> 
                    <div>
                        {chapters.results.map(chapter => {
                            return(
                                <div key={chapter.id}>
                                    <h4><Link to={`/works/${work.id}/chapters/${chapter.id}`}>{chapter.title}</Link></h4>
                                </div>
                            
                            )
                        })}
                        {addNewChapter}
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