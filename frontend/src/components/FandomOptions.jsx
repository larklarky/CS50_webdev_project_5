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
    };

    getOptions = (inputValue) => {
        const token = localStorage.getItem('token')
        let headers = {}
        if(token !== null) {
            headers['Authorization'] = `Token ${token}`
        }

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


    makeOptions(response) {
        let options = [];
        if (response.results) {
            options = response.results.map(fandom => {
                return { value: fandom.id, label: fandom.name }
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
                onInputChange={this.handleInputChangeFandom}
                onChange={this.props.onChange}
            />
        )
    }
}

export default FandomOptions;