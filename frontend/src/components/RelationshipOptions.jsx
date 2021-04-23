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

    handleOnChange(relationships) {
        console.log('>>>>>>>>>>', relationships);
        return this.props.onChange(relationships.map(relationship => {
            return {id: relationship.value, name: relationship.label}
        }));
    }

    render() {
        console.log('relationships props', this.props.value)
        return(
            <AsyncSelect
                isMulti
                cacheOptions
                defaultOptions
                value={this.props.value}
                loadOptions={this.getOptions}
                onInputChange={this.handleInputChangeRelationship}
                onChange={(value) => this.handleOnChange(value)}
            />
        )
    }
}

export default RelationshipOptions;