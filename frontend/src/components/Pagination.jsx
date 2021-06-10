import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from './Loader';
import { Link } from 'react-router-dom';


const Pagination = ({page=1, count, pageSize=2}) => {
    console.log('bookmarks pagination', count)
    
    let prevButton;
    let nextButton;
    let pagesAmount = Math.ceil(count / pageSize)
    let nextPage = parseInt(page) + 1
    let prevPage = parseInt(page) - 1
    
    
    if(page < pagesAmount) {
        nextButton = <button className='btn next'><Link to={`?page=${nextPage}`}>Next</Link></button>
    }
    if(page > 1 ){
        prevButton = <button className='btn next'><Link to={`?page=${prevPage}`}>Previous</Link></button>
    }

    return(
        <div className='pagination-container'>
            {prevButton}
            {nextButton}
            
        </div>
    )
}


export default Pagination;