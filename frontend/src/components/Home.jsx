import React, { Component } from 'react';
import { connect } from 'react-redux';
import {getWorks} from '../actions';

class Home extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getWorks()
    }

    render() {
        console.log(this.props.works)
        return(
            <div>Home</div>
        )
    }
}


function mapStateToProps(state) {
    return {
        works: state
    }
}

export default connect(mapStateToProps, {getWorks,}) (Home);