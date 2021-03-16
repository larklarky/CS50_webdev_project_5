import React, { Component } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import AsyncSelect from 'react-select/async';


class CharactersOptions extends Component {
    constructor(props) {
        super(props)
        this.state = {
            characters: '',
        }
    }

    handleInputChangeCharacter = (newValue) => {
        const inputValue = newValue.replace(/\W/g, '');
        this.setState({ characters: inputValue });
    };

    getOptions = (inputValue) => {
        const token = localStorage.getItem('token')
        let headers = {}
        if(token !== null) {
            headers['Authorization'] = `Token ${token}`
        }

        return fetch(
            `http://127.0.0.1:8000/api/characters?search=${inputValue}`
        )
        .then((response) => {
            return response.json()
        })
        .then( response => {
            return this.makeOptions(response)
        })
    }


    makeOptions(response) {
        let options = [];
        if (response.results) {
            options = response.results.map(character => {
                return { value: character.id, label: character.name }
            })
        }
        return options;
    }

    render() {

        return(
            <AsyncSelect
                isMulti
                cacheOptions
                defaultOptions
                loadOptions={this.getOptions}
                onInputChange={this.handleInputChangeCharacter}
                onChange={this.props.onChange}
            />
        )
    }
}

export default CharactersOptions;