import React, { Component } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import AsyncSelect from 'react-select/async';


class FandomOptions extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fandoms: '',
            listOfFandoms: {},
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
            `http://127.0.0.1:8000/api/fandoms/?search=${inputValue}`
        )
        .then((response) => {
            return response.json()
        })
        .then( response => {
            // let list = response.results;
            // let newList = this.createNewObject(list)
            // this.setState(state =>{
            //     return {listOfFandoms: {...state.listOfFandoms, ...newList}}
            // })
            return this.makeOptions(response)
        })
    }

    // createNewObject(fandoms) {
    //     let objectNew = fandoms.reduce((result, item) => {
    //         let key = item.id;
    //         result[key] = item;
    //         return result;
    //       }, {});
    //     return objectNew;
    // }


    makeOptions(response) {
        let options = [];
        if (response.results) {
            options = response.results.map(fandom => {
                console.log('fandom data', fandom)
                return { value: fandom.id, label: fandom.name, category: fandom.category}
            })
        }
        return options;
    }

    handleOnChange(fandoms) {
        // let {listOfFandoms} = this.state;
        // let fandomsList = []

        // for(let fandom of fandoms) {
        //     fandomsList.push(listOfFandoms[fandom.value])  
        // }
        return this.props.onChange(fandoms.map(fandom => {
            return {id: fandom.value, name: fandom.label, category: fandom.category}
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
                onInputChange={this.handleInputChangeFandom}
                onChange={(value) => this.handleOnChange(value)}
            />
        )
    }
}

export default FandomOptions;