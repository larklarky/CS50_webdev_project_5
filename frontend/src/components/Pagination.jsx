import React, { Component } from 'react';
import { Link } from 'react-router-dom';


const Pagination = ({page=1, count, pageSize=5, search=''}) => {
    
    let prevButton;
    let nextButton;
    let pagesAmount = Math.ceil(count / pageSize)
    let nextPage = parseInt(page) + 1
    let prevPage = parseInt(page) - 1
    
    
    if(page < pagesAmount) {
        nextButton = <button className='btn next'><Link to={`?page=${nextPage}&search=${search}`}>Next</Link></button>
    }
    if(page > 1 ){
        prevButton = <button className='btn next'><Link to={`?page=${prevPage}&search=${search}`}>Previous</Link></button>
    }

    return(
        <div className='pagination-container'>
            {prevButton}
            {nextButton}
            
        </div>
    )
}


export default Pagination;