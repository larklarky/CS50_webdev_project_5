import React, { Component } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import AsyncSelect from 'react-select/async';


class CharactersOptions extends Component {

    getOptions = (inputValue) => {
        const token = localStorage.getItem('token')
        let headers = {}
        if(token !== null) {
            headers['Authorization'] = `Token ${token}`
        }

        return fetch(
            `http://127.0.0.1:8000/api/characters/?search=${inputValue}`
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
                return { value: character.id, label: character.name, id: character.id, fandom: character.fandom }
            })
        }
        console.log('make options', response.results, options);
        return options;
    }

    handleOnChange(characters) {
        console.log('>>>>>>>>>>', characters);
        return this.props.onChange(characters.map(character => {
            return {id: character.id, name: character.label, fandom: character.fandom}
        }));
    }

    render() {

        return(
            <AsyncSelect
                isMulti
                cacheOptions
                defaultOptions
                value={this.props.value}
                loadOptions={this.getOptions}
                onChange={(value) => this.handleOnChange(value)}
            />
        )
    }
}

export default CharactersOptions;