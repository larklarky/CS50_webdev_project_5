import React, { Component } from 'react';
import { Link } from 'react-router-dom';


const Pagination = ({page=1, count, pageSize=2}) => {
    
    let prevButton;
    let nextButton;
    let pagesAmount = Math.ceil(count / pageSize)
    let nextPage = parseInt(page) + 1
    let prevPage = parseInt(page) - 1

    console.log('page', page, 'next page', nextPage, 'prev page', prevPage)
    
    
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