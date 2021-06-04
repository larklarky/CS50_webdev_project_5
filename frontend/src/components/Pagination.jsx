import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from './Loader';


const Pagination = ({page, pageSize, count}) => {
    
    console.log('pagination props', page, pageSize, count)

    return(
        <div className='pagination=container'>
            
        </div>
    )
}


export default Pagination;