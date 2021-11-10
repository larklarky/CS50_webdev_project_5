import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {editWork, getWork} from '../actions';
import {WARNINGS, CATEGORIES, RATES} from '../constants';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import AsyncSelect from 'react-select/async';
import FandomOptions from './FandomOptions';
import CharactersOptions from './CharactersOptions';
import RelationshipOptions from './RelationshipOptions';
import Loader from './Loader';
import { Redirect } from 'react-router';



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
            redirect: false,
        }
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        const {work} = this.props;
        if (Object.keys(work).length === 0) {
            this.props.getWork(params.workId)
        } else {
            this.setState({
                workId: parseInt(params.workId),
                title: work.title,
                description: work.description,
                rating: work.rating,
                completed: work.completed,
                relationships: work.relationships,
                characters: work.characters.map(character => {
                    return { value: character.id, label: character.name, id: character.id, fandom: character.fandom }
                }),
                categories: work.categories.map(category => {
                    return {value: category.name, label: CATEGORIES[category.name].text}
                }),
                warnings: work.warnings.map(warning => {
                    return {value: warning.name, label: WARNINGS[warning.name].text};
                }),
                fandoms: work.fandoms,
            })
        }
    }
    

    componentDidUpdate(prevProps) {
        if(Object.keys(this.props.work).length !== Object.keys(prevProps.work).length) {
            const {work} = this.props;
            const currentUser = localStorage.getItem('currentUser');
            if (work.user.id != currentUser) {
                this.setState({redirect: true})
            } else {
                this.setState({
                    workId: work.id,
                    title: work.title,
                    description: work.description,
                    rating: work.rating,
                    completed: work.completed,
                    relationships: work.relationships,
                    characters: work.characters.map(character => {
                        return { value: character.id, label: character.name, id: character.id, fandom: character.fandom }
                    }),
                    categories: work.categories.map(category => {
                        return {value: category.name, label: CATEGORIES[category.name].text}
                    }),
                    warnings: work.warnings.map(warning => {
                        return {value: warning.name, label: WARNINGS[warning.name].text};
                    }),
                    fandoms: work.fandoms,
                })
            }
            
        }
    }

    handleEditWork(e) {
        e.preventDefault()
        const {workId, title, description, completed, fandoms, rating} = this.state;
        let characters = this.state.characters.map(character => {
            return {name: character.label, fandom: character.fandom}
        })
        let warnings = this.state.warnings.map(warning => {
            return {name: warning.value}
        }) 
        let relationships;
        if(this.state.relationships.length !== 0) {
            relationships = this.state.relationships.map(relationship => {
                return {name: relationship.name}
            })
        }
        
        let category = this.state.categories.map(category => {
            return {name: category.value}
        })
        
        this.props.editWork(workId, title, description, completed, warnings, relationships, rating, category, characters, fandoms)
    }
    
    render() {

        if (this.state.redirect === true) {
            return <Redirect to='/'/>
        } else if (Object.keys(this.props.work).length === 0) {
            return <Loader/> 
        } 
    
        
        const animatedComponents = makeAnimated()

        
        const rateOptions = Object.keys(RATES).map(rate => {
            return {value: rate, label: RATES[rate].text}
        })
        

        const RateComponent = () => {
            return (
                <Select
                    value={rateOptions.find(obj => obj.value === this.state.rating)}
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
            let warnings = this.state.warnings || [];

            return (
              <Select
                cacheOptions
                closeMenuOnSelect={false}
                components={animatedComponents}
                value={warnings}
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
            let categories = this.state.categories || [];
            return (
                <Select 
                    components={animatedComponents}
                    value={categories}
                    options={categoriesOptions} 
                    onChange={(newValue) => {
                        this.setState({ categories:  newValue})
                    }}
                />
            )
        }

        let characters = this.state.characters || [];
        let fandoms = this.state.fandoms || [];
        let relationships = this.state.relationships || [];

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
                                value = {fandoms.map(fandom => {
                                    return {value: fandom.id, label: fandom.name}
                                })}
                                onChange={(newValue) => {
                                    this.setState({ fandoms:  newValue})
                                }}
                            />
                        </div>
                        
                        <div className='options-list'>
                            <h5>Characters</h5>
                            <CharactersOptions
                                value = {characters}
                                onChange={(newValue) => {
                                    this.setState({ characters:  newValue})
                                }}
                            />
                        </div>
                        <div className='options-list'>
                            <h5>Relationships</h5>
                            <RelationshipOptions
                                value = {relationships.map(relationship => {
                                    return {value: relationship.id, label: relationship.name}
                                })}
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
    return {
        work: state.work,
        editedWork: state.editedWork,
    }
}

export default connect(mapStateToProps, {editWork, getWork}) (EditWork);