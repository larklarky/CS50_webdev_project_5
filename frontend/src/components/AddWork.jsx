import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {getWorks, getFandomCategories} from '../actions';
import {WARNINGS, CATEGORIES, RATES} from '../constants';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import AsyncSelect from 'react-select/async';



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

    

    render() {
        const rates = Object.keys(RATES)
        const warnings = Object.keys(WARNINGS)
        const categories = Object.keys(CATEGORIES)

        const options = [
            { value: 'chocolate', label: 'Chocolate' },
            { value: 'strawberry', label: 'Strawberry' },
            { value: 'vanilla', label: 'Vanilla' }
        ]
        
        const rateOptions = Object.keys(RATES).map(rate => {
            return {value: rate, label: RATES[rate].text}
        })

        

          
        const MyComponent = () => (
        <Select options={rateOptions} />
        )
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
                        <div className='warning-list'>
                            <h5>Warnings</h5>
                            {warnings.map(warning => {
                                return(
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" name="warnings" id={WARNINGS[warning].text} value={WARNINGS[warning].id} />
                                        <label class="form-check-label" for={WARNINGS[warning].text}>
                                            {WARNINGS[warning].text}
                                        </label>
                                    </div>
                                )
                            })}
                        </div>
                        <div className='rating-list'>
                            <h5>Rating</h5>
                            {rates.map(rate => {
                                return(
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value={rate} />
                                        <label class="form-check-label" for="examleRadios1">
                                            {RATES[rate].text}
                                        </label>
                                    </div>
                                )
                            })}
                        </div>
                        {MyComponent()}


                        
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