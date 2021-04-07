import React, { Component } from 'react';
import { connect } from 'react-redux';
import {createChapter} from '../actions';
import ISimpleMDE from 'react-simplemde-v1';
import 'simplemde/dist/simplemde.min.css';

 



class AddChapter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            text: '',
            workId: '',
        }
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        this.setState({workId: params.workId});
    }

    handleCreateChapter(e) {
        e.preventDefault()
        const {title, text, workId} = this.state;
        this.props.createChapter(title, text, workId)
    }


    render() {
        const option = {};

        // const onReady = (instance) => console.log('onReady function', instance.value());

        const setText = (value) => this.setState({text: value})
        

        const onEvents = {
            'change': function() {
                // the 'this' variable can get SimpleMDE instance
                let value = this.value()
                setText(value)
            }
        };

        console.log('chapter text', this.state.text)

        return(
            <div>
                <h3 className='add-chapter-title'>Add new chapter</h3>
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
                            onClick={(e) => this.handleCreateChapter(e)}
                        >
                            Create chapter
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
        newChapter: state.newChapter,
    }
}

export default connect(mapStateToProps, {createChapter}) (AddChapter);
