import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {getWorks, getFandomCategories} from '../actions';
import {WARNINGS, CATEGORIES, RATES} from '../constants';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import AsyncSelect from 'react-select/async';
// import FandomOptions from './FandomOptions';
import FandomOptions from './FandomOptions';
import CharactersOptions from './CharactersOptions';
import RelationshipOptions from './RelationshipOptions';



class AddWork extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            description: '',
            rating:'',
            completed: false,
            relationships: '',
            characters: '',
            categories: '',
            warnings: '',
            fandoms: '',
            inputValue: '',
        }
    }

    handleInputChange = (newValue) => {
        console.log('newValue', newValue)
        this.setState({ inputValue:  newValue});
    };

    // handleCreateWork(e) {

    // }

    
    render() {
        
        const rates = Object.keys(RATES)
        const warnings = Object.keys(WARNINGS)
        const categories = Object.keys(CATEGORIES)


        const animatedComponents = makeAnimated()

        const options = [
            { value: 'chocolate', label: 'Chocolate' },
            { value: 'strawberry', label: 'Strawberry' },
            { value: 'vanilla', label: 'Vanilla' }
        ]
        
        const rateOptions = Object.keys(RATES).map(rate => {
            return {value: rate, label: RATES[rate].text}
        })

        const RateComponent = () => (
            <Select options={rateOptions} />
        )


        const warningOptions = Object.keys(WARNINGS).map(warning => {
            return {value: WARNINGS[warning].id, label: WARNINGS[warning].text}
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
                onChange={this.handleInputChange}
              />
            );
        }

        const categoriesOptions = Object.keys(CATEGORIES).map(category => {
            return {value: CATEGORIES[category].id, label: CATEGORIES[category].text}
        })

        const CategoriesComponent = () => {
            return <Select options={categoriesOptions} />
        }

        

      
        
        console.log('ratee options', rateOptions)

        return(
            <div>
                <h3>Add Work</h3>
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
                            <FandomOptions/>
                        </div>
                        
                        <div className='options-list'>
                            <h5>Characters</h5>
                            <CharactersOptions/>
                        </div>
                        <div className='options-list'>
                            <h5>Relationships</h5>
                            <RelationshipOptions/>
                        </div>
                        <div className='is-completed'>
                            <label for='isCompleted'>Completed</label>
                            <input type='checkbox' id='isCompleted'/>
                        </div>
                        <button 
                            // disabled={this.state.password.length === 0 || this.state.username.length === 0 ? true : false} 
                            onClick={(e) => this.handleCreateWork(e)}
                        >
                            Create work
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
        works: state.works,
        fandomCategories: state.fandomCategories,
        currentUser: state.currentUser,
    }
}

export default connect(mapStateToProps, {getWorks, getFandomCategories}) (AddWork);