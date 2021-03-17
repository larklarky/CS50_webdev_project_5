import React, { Component } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import AsyncSelect from 'react-select/async';


class RelationshipOptions extends Component {
    constructor(props) {
        super(props)
        this.state = {
            relationships: '',
        }
    }

    handleInputChangeRelationship = (newValue) => {
        const inputValue = newValue.replace(/\W/g, '');
        this.setState({ relationships: inputValue });
    };

    getOptions = (inputValue) => {
        const token = localStorage.getItem('token')
        let headers = {}
        if(token !== null) {
            headers['Authorization'] = `Token ${token}`
        }

        return fetch(
            `http://127.0.0.1:8000/api/relationships/?search=${inputValue}`
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
            options = response.results.map(relationship => {
                return { value: relationship.id, label: relationship.name }
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
                onInputChange={this.handleInputChangeRelationship}
                onChange={this.props.onChange}
            />
        )
    }
}

export default RelationshipOptions;