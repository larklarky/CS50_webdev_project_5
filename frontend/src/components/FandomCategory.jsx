import React, { Component } from 'react';

class FandomCategory extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { match: { params } } = this.props;

        console.log('params', params.categoryId)
    }

    render() {
        console.log('category props', this.props)
        
        return(
            <div>Category</div>
        )
    }
}

export default FandomCategory;