import React, { Component } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import AsyncSelect from 'react-select/async';


class FandomOptions extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fandoms: '',
        }
    }

    handleInputChangeFandom = (newValue) => {
        const inputValue = newValue.replace(/\W/g, '');
        this.setState({ fandoms: inputValue });
        // this.getOptions(inputValue)
    };

    getOptions = (inputValue) => {
        console.log('eeeeeee')
        const token = localStorage.getItem('token')
        const fandom = this.state.fandoms
       
        let headers = {}
        if(token !== null) {
            headers['Authorization'] = `Token ${token}`
        }

        if (fandom.length === 0) {
            return fetch(
                `http://127.0.0.1:8000/api/fandoms/`
            )
            .then((response) => {
                return response.json()
            })
            .then( response => {
                return this.makeOptions(response)
            })

        } else {
            return fetch(
                `http://127.0.0.1:8000/api/fandoms?search=${inputValue}`
            )
            .then((response) => {
                return response.json()
            })
            .then( response => {
                return this.makeOptions(response)
            })
        }
        
    }


    makeOptions(response) {
        console.log('response fandom+++++', response)
        let options = [];
        console.log('fandomList------', response.results)
        if (response.results) {
            console.log('%%%%%%%%%%%')
            options = response.results.map(fandom => {
                return { value: fandom.id, label: fandom.name }
            })
            console.log('options ((()))))))))))', options)
        }
        console.log('options ***((((', options)
        return options;
    }

    render() {

        return(
            <AsyncSelect
                isMulti
                cacheOptions
                defaultOptions
                loadOptions={this.getOptions}
                onInputChange={this.handleInputChangeFandom}
            />
        )
    }
}

export default FandomOptions;