import React, { Component } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import AsyncSelect from 'react-select/async';


class CharactersOptions extends Component {
    constructor(props) {
        super(props)
        this.state = {
            characters: '',
            listOfCharacters: {},
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
            `http://127.0.0.1:8000/api/characters/?search=${inputValue}`
        )
        .then((response) => {
            return response.json()
        })
        .then( response => {
            let list = response.results;
            let newList = this.createNewObject(list)
            this.setState(state =>{
                return {listOfCharacters: {...state.listOfCharacters, ...newList}}
            })
            return this.makeOptions(response)
        })
    }

    createNewObject(characters) {
        let objectNew = characters.reduce((result, item) => {
            let key = item.id;
            result[key] = item;
            return result;
          }, {});
        return objectNew;
    }
    


    makeOptions(response) {
        let options = [];
        if (response.results) {
            options = response.results.map(character => {
                console.log('character data', character)
                return { value: character.id, label: character.name }
            })
        }
        return options;
    }

    handleOnChange(characters) {
        console.log('characters', characters)
        
        let {listOfCharacters} = this.state;
        let charactersList = []

        for(let character of characters) {
            charactersList.push(listOfCharacters[character.value])  
        }
        return this.props.onChange(charactersList);
    }

    render() {
        console.log('state listOfCharacters', this.state.listOfCharacters)

        return(
            <AsyncSelect
                isMulti
                cacheOptions
                defaultOptions
                loadOptions={this.getOptions}
                onInputChange={this.handleInputChangeCharacter}
                onChange={(value) => this.handleOnChange(value)}
            />
        )
    }
}

export default CharactersOptions;