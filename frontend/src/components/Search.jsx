import React, {useState} from 'react';
import {BrowserRouter as Router, useHistory} from "react-router-dom";
import "bootstrap/scss/bootstrap.scss"





function Search(props) {
  let history = useHistory();
  
  const [search, setSearch] = useState('');   

  const handleSearch = (e) => {
    e.preventDefault();
    history.push(`/works?search=${search}`);
  };

  return (
    <form className="form-inline my-2 my-lg-0">
        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => setSearch(e.target.value) }/>
        <button className="btn btn-outline my-2 my-sm-0" type="submit" onSubmit={handleSearch} onClick={handleSearch}>Search</button>
    </form>
  )
}


export default Search;
