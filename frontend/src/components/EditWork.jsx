import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {editWork, getWork} from '../actions';
import {WARNINGS, CATEGORIES, RATES} from '../constants';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import AsyncSelect from 'react-select/async';
// import FandomOptions from './FandomOptions';
import FandomOptions from './FandomOptions';
import CharactersOptions from './CharactersOptions';
import RelationshipOptions from './RelationshipOptions';
 



class EditWork extends Component {
    constructor(props) {
        super(props)
        this.state = {
            workId: '',
            title: '',
            description: '',
            rating:'',
            completed: false,
            relationships: '',
            characters: '',
            categories: '',
            warnings: '',
            fandoms: '',
        }
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        const {work} = this.props;
        if (Object.keys(work).length === 0) {
            this.props.getWork(params.workId)
        } else {
            this.setState({
                workId: params.workId,
                title: work.title,
                description: work.description,
                rating:'',
                completed: false,
                relationships: '',
                characters: '',
                categories: '',
                warnings: '',
                fandoms: '',
            })
        }
    }
    

    componentDidUpdate(prevProps) {
        if(Object.keys(this.props.work).length !== Object.keys(prevProps.work).length) {
            const {work} = this.props;
            this.setState({
                workId: work.id,
                title: work.title,
                description: work.description,
                rating: work.rating,
                completed: work.completed,
                relationships: work.relationships,
                characters: work.characters,
                categories: work.categories,
                warnings: work.warnings,
                fandoms: work.fandoms,
            })
        }
    }

    handleEditWork(e) {
        e.preventDefault()
        const {title, description, completed, characters, fandoms, rating, categories} = this.state;
        let warnings = this.state.warnings.map(warning => {
            return {name: warning.value}
        }) 
        let relationships = this.state.relationships.map(relationship => {
            return {name: relationship.label}
        })
        
        let category = [{name: categories.value}]
        this.props.editWork(title, description, completed, warnings, relationships, rating.value, category, characters, fandoms)
    }

   

    
    render() {
        if (Object.keys(this.props.work).length === 0) {
            return <div>Loading</div>;
        }
        
        const animatedComponents = makeAnimated()

        
        const rateOptions = Object.keys(RATES).map(rate => {
            return {value: rate, label: RATES[rate].text}
        })

        console.log('rateOptions', rateOptions, 'type of', typeof rateOptions)
        console.log('characters', this.state.characters)
        
        

        const RateComponent = () => {
            let value;
            if (this.state.rating.length > 0)  {
                value = [{value: this.state.rating, label: RATES[this.state.rating].text}];
            } else {
                value = [];
            }
            console.log('>><<<<<<<_______', this.state, value, {value: "NOT_RATED", label: "Not Rated"});
            return (
                <Select
                    defaultValue={value}
                    options={rateOptions} 
                    onChange={(newValue) => {
                        this.setState({ rating:  newValue})
                    }}
                />
            ) 
        }
            


        const warningOptions = Object.keys(WARNINGS).map(warning => {
            return {value: warning, label: WARNINGS[warning].text}
        })

        const WarningComponent = () => {
            return (
              <Select
                cacheOptions
                closeMenuOnSelect={false}
                components={animatedComponents}
                // defaultValue={[colourOptions[4], colourOptions[5]]}
                isMulti
                options={warningOptions}
                defaultOptions
                onChange={(newValue) => {
                    this.setState({ warnings:  newValue})
                }}
              />
            );
        }

        const categoriesOptions = Object.keys(CATEGORIES).map(category => {
            return {value: category, label: CATEGORIES[category].text}
        })

        const CategoriesComponent = () => {
            return (
                <Select 
                    options={categoriesOptions} 
                    onChange={(newValue) => {
                        this.setState({ categories:  newValue})
                    }}
                />
            )
        }


        return(
            <div>
                <h3 className='add-work-title'>Edit Work</h3>
                <div className='add-work-container'>
                    <form className='add-work-form-group'>
                        <div className='form-field'>
                            <h5>Title</h5>
                            <input
                                type='text'
                                value={this.state.title}
                                onChange={(e) => this.setState({title: e.target.value})}
                            />
                        </div>
                        <div className='form-field'>
                            <h5>Description</h5>
                            <textarea
                                type='text'
                                value={this.state.description}
                                onChange={(e) => this.setState({description: e.target.value})}
                            />
                        </div>
                        <div className='options-list'>
                            <h5>Warnings</h5>
                            {WarningComponent()}
                        </div>
                        <div className='options-list'>
                            <h5>Rating</h5>
                            {RateComponent()}
                        </div>

                        <div className='options-list'>
                            <h5>Category</h5>
                            {CategoriesComponent()}
                        </div>
                        <div className='options-list'>
                            <h5>Fandom</h5>
                            <FandomOptions
                                onChange={(newValue) => {
                                    this.setState({ fandoms:  newValue})
                                }}
                            />
                        </div>
                        
                        <div className='options-list'>
                            <h5>Characters</h5>
                            <CharactersOptions
                                onChange={(newValue) => {
                                    this.setState({ characters:  newValue})
                                }}
                            />
                        </div>
                        <div className='options-list'>
                            <h5>Relationships</h5>
                            <RelationshipOptions
                                onChange={(newValue) => {
                                    this.setState({ relationships:  newValue})
                                }}
                            />
                        </div>
                        <div className='is-completed'>
                            <label for='isCompleted'><h5>Completed</h5></label>
                            <input type='checkbox' id='isCompleted' onClick={() => this.setState({completed: !this.state.completed})}/>
                        </div>
                        <button 
                            disabled={this.state.title.length === 0
                                    || this.state.description.length === 0
                                    || this.state.rating.length === 0
                                    || this.state.warnings.length === 0
                                    || this.state.relationships.length === 0
                                    || this.state.characters.length === 0
                                    || this.state.categories.length === 0
                                    || this.state.fandoms.length === 0 ? true : false} 
                            onClick={(e) => this.handleEditWork(e)}
                        >
                            Edit work
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
        work: state.work,
        editedWork: state.editedWork,
    }
}

export default connect(mapStateToProps, {editWork, getWork}) (EditWork);