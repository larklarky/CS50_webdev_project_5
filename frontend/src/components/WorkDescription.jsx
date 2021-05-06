import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faTrashAlt, faTrash } from '@fortawesome/free-solid-svg-icons'
import { format, parse } from 'date-fns';
import { Link } from 'react-router-dom';
import {WARNINGS, CATEGORIES, RATES} from '../constants';
import Popup from 'reactjs-popup';
// import 'reactjs-popup/dist/index.css';




const WorkDescription = ({work}) => {
    const currentUser = localStorage.getItem('currentUser');
    console.log(currentUser == work.user.id);
    let EditButton;
    let DeleteButton;

    <Popup trigger={<button className="button"> Open Modal </button>} modal>
    <span> Modal content </span>
  </Popup>

    if (currentUser == work.user.id) {
        EditButton =  <button className='edit-work'><Link to={`/works/edit/${work.id}/`}><FontAwesomeIcon icon={faPencilAlt} color='#005C6E' size="1x" data-toggle="tooltip" data-placement="bottom" title='Edit work'/></Link></button>
        DeleteButton = <Popup trigger={<button className='delete-button'><FontAwesomeIcon icon={faTrashAlt} color='#005C6E' size="1x" data-toggle="tooltip" data-placement="top" title='Delete work'/></button>} modal>
            {close => (
                <>
                    <div className="modal-message"><h3>Delete work?</h3></div>
                    <div className="actions">
                        <button className="modal-button">Yes</button>
                        <button
                         className="modal-button"
                         onClick={() => {close()}}
                        >No</button>
                    </div>
                </>
            )}
            
        </Popup> 
    } 
    
    return(
        <div className='row work-information-card'>
            <div className='information-container'>
                <div className='work-title-container'>
                    <h3>
                        <Link to={`/works/${work.id}`}>{work.title}</Link> by <Link to={`/users/${work.user.id}`}>{work.user.username}</Link>
                    </h3>
                    <div>
                        {EditButton}
                        {DeleteButton}
                    </div>
                    
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
                <p> Relationships and characters: &nbsp;
                    {work.relationships.map(relationship => {
                        return (<span className='badge-pill relationship-and-character-tag'>{relationship.name}</span>)
                    })}
                    {work.characters.map(character => {
                        return(<span className='badge-pill relationship-and-character-tag'>{character.name}</span>)
                    })}
                </p>
                <span>Warnings: {work.warnings.map(warning => {
                    return <span className='badge-pill relationship-and-character-tag'>{(WARNINGS[warning.name].text)}</span>
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