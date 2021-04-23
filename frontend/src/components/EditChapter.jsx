import React, { Component } from 'react';
import { connect } from 'react-redux';
import {editChapter, getChapter} from '../actions';
import ISimpleMDE from 'react-simplemde-v1';
import 'simplemde/dist/simplemde.min.css';
import Loader from './Loader';

 



class EditChapter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            text: '',
            workId: '',
            chapterId: '',
            loaded: false,
        }
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        const{chapter} = this.props;
        this.setState({workId: params.workId, chapterId: params.chapterId});
        
        
        if (Object.keys(chapter).length === 0) {
            this.props.getChapter(params.chapterId);
        } else {
            this.setState({
                title: chapter.title,
                text: chapter.text,
                loaded: true
            })
        }
    }

    componentDidUpdate(prevProps) {
        if(Object.keys(this.props.chapter).length !== Object.keys(prevProps.chapter).length) {
            const {chapter} = this.props;
            this.setState({
                title: chapter.title,
                text: chapter.text,
                loaded: true
            })
        }
    }

    handleEditChapter(e) {
        e.preventDefault()
        const {chapterId, title, text, workId} = this.state;
        this.props.editChapter(chapterId, title, text, workId)
    }


    render() {

        if (this.state.loaded === false) {
            return <Loader/>
        } 


        const option = {
            placeholder: "Type here...",
            initialValue: this.state.text,
        };

        // const onReady = (instance) => console.log('onReady function', instance.value());

        const setText = (value) => this.setState({text: value})
        

        const onEvents = {
            'change': function() {
                // the 'this' variable can get SimpleMDE instance
                let value = this.value()
                setText(value)
            }
        };
        


        return(
            <div>
                <h3 className='add-chapter-title'>Edit chapter</h3>
                <div className='add-chapter-container'>
                    <form className='add-chapter-form-group'>
                    <div className='form-field'>
                            <h5>Title</h5>
                            <input
                                type='text'
                                value={this.state.title}
                                onChange={(e) => this.setState({title: e.target.value})}
                            />
                        </div>
                        <div className='form-field'>
                            <h5>Text</h5>
                            <ISimpleMDE
                                option={option}
                                text={this.state.text}
                                onEvents={onEvents}
                            />
                        </div>
                        <button 
                            disabled={this.state.title.length === 0
                                    || this.state.text.length === 0 ? true : false} 
                            onClick={(e) => this.handleEditChapter(e)}
                        >
                            Edit chapter
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    console.log('=======ghghghg', state)
    return {
        chapter: state.chapter,
    }
}

export default connect(mapStateToProps, {editChapter, getChapter}) (EditChapter);
