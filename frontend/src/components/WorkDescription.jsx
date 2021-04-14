import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { format, parse } from 'date-fns';
import { Link } from 'react-router-dom';
import {WARNINGS, CATEGORIES, RATES} from '../constants';

const WorkDescription = ({work}) => {
    const currentUser = localStorage.getItem('currentUser');
    console.log(currentUser == work.user.id);
    let EditButton;

    if (currentUser == work.user.id) {
        EditButton = <button className='edit-work'><Link to={`/works/edit/${work.id}/`}><FontAwesomeIcon icon={faPencilAlt} color='#005C6E' size="1x" />Edit Work</Link></button>
    } 
    
    return(
        <div className='row work-information-card'>
            <div className='information-container'>
                <div className='work-title-container'>
                    <h3>
                        <Link to={`/works/${work.id}`}>{work.title}</Link> by <Link to={`/users/${work.user.id}`}>{work.user.username}</Link>
                    </h3>
                    {EditButton}
                </div>
                
                
                <div className={'badge' + ' ' + 'category-badge' + " " + work.categories.map(category => {
                        return(CATEGORIES[category.name].class)})} >
                    <span>{work.categories.map(category =>{
                        return(CATEGORIES[category.name].smallIcon)})} &nbsp;
                    </span>
                    <span>{work.categories.map(category =>{
                        return(CATEGORIES[category.name].text)})}
                    </span>
                </div>
                
                <span className={'badge' + ' ' + RATES[work.rating].class}>{RATES[work.rating].text}</span>
                <span className={work.completed ? 'badge work-status-finished' : 'badge work-status-process'}>
                    {work.completed ? 'Finished' : 'In process'}
                </span>
                <h6>Fandoms: {work.fandoms.map(fandom => {
                        return (fandom.name)}).join(', ')}
                </h6>
                <span>Warnings: {work.warnings.map(warning => {
                    return (WARNINGS[warning.name].text)
                })} </span>
                <div className='work-description'>
                    <p>{work.description}</p>
                    <p>Last update: {format(new Date(work.date_modified), 'yyyy-MM-dd')}</p>
                </div>
                
            </div>
            
        </div>
    )
}

export default WorkDescription;