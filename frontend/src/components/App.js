import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route, Link, useParams, NavLink, useHistory} from "react-router-dom";
import Login from './Login';
import Registration from './Registration';
import Home from './Home';
import FandomsByCategory from './FandomsByCategory'
import "bootstrap/scss/bootstrap.scss"
import '../App.scss';
import WorksByFandom from './WorksByFandom';
import Profile from './Profile';
import Work from './Work';
import Chapter from './Chapter';
import AddWork from './AddWork';
import AddChapter from './AddChapter';
import EditWork from './EditWork';
import EditChapter from './EditChapter';
import UserBookmarks from './UserBookmarks';
import AllWorks from './AllWorks';
import {logout, getCurrentUser, getWorks} from '../actions';
import { connect } from 'react-redux';
import history from '../history'
import Search from './Search';
import ErrorMessage from './ErrorMessage';



function App(props) {
  
  const [toggler, setToggler] = useState(false);

  
  const handleLogout = () => {
    props.logout()
  }

  useEffect(() => {
    if(localStorage.getItem('token') !== null) {
      props.getCurrentUser()
    }

  }, [])
  

  let errorData;
  let errorComponent;
  if(Object.keys(props.errorMessage).length !== 0) {
    errorData = props.errorMessage.non_field_errors[0];
    errorComponent = <ErrorMessage errorMessage={errorData}/>
  }


  const {currentUser} = props;
  let navItem;
  let navItem2;
  let navItem3;
  if (localStorage.getItem('token') === null) {
    navItem = <NavLink to="/login" activeClassName="selected">Login</NavLink>
    navItem2 = <NavLink to="/registration" activeClassName="selected">Registration</NavLink>
  } else {
    navItem = <NavLink to={`/users/${currentUser.id}`} activeClassName='selected'>My Profile</NavLink>
    navItem2 = <NavLink to="#" onClick={handleLogout}>Logout</NavLink>
    navItem3 = <li className='nav-item'><NavLink to={`/works/bookmarks`} activeClassName='selected'>Bookmarks</NavLink></li>
  }
  return (
    <Router history={history}>
      <div>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="navbar-brand"><NavLink exact to="/"><img className='navbar-img' src='/quill-drawing-a-line.svg' /></NavLink></div>
        {/* <a className="navbar-brand" href="#">Navbar</a> */}
        <button className={toggler ?  "navbar-toggler" : "navbar-toggler collapsed"} onClick={(e) => setToggler(!toggler)} type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded={toggler ? "true" : "false"} aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={toggler ? "collapse navbar-collapse show" : "collapse navbar-collapse"} id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink exact to="/" activeClassName="selected">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={`/works`} activeClassName="selected">All Works</NavLink>
            </li>
            <li className="nav-item">
              {navItem}
              {/* <NavLink to="/login" activeClassName="selected">Login</NavLink> */}
            </li>
            {navItem3}
            <li className='nav-item'>
              {navItem2}
              {/* <NavLink to="/registration" activeClassName="selected">Registration</NavLink> */}
            </li>
          </ul>
          <Search />
        </div>
      </nav>
      {errorComponent}

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/fandom_categories/:categoryId" component={FandomsByCategory}>
          </Route>
          <Route path="/fandoms/:fandomId/works" component={WorksByFandom}>
          </Route>
          <Route path="/users/:userId" component={Profile}></Route>
          <Route path="/works/add/:workId/chapter" component={AddChapter}></Route>
          <Route path="/works/add" component={AddWork}></Route>
          <Route path="/works/bookmarks" component={UserBookmarks}></Route>
          <Route path="/works/edit/:workId/chapters/:chapterId" component={EditChapter}></Route>
          <Route path="/works/edit/:workId" component={EditWork}></Route>
          <Route path="/works/:workId/chapters/:chapterId" component={Chapter}></Route>
          <Route path="/works/:workId" component={Work}></Route>
          <Route path="/works" component={AllWorks}></Route>
          
          
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/registration">
            <Registration />
          </Route>
          <Route exact path="/" component={Home}></Route>
          
        </Switch>

          <div className="footer-basic">
            <footer>
                <div className="social">
                  <a href="#"><i className="icon ion-social-instagram fa fa-instagram"></i></a>
                  <a href="#"><i className="icon ion-social-snapchat fa fa-snapchat-ghost"></i></a>
                  <a href="#"><i className="icon ion-social-twitter fa fa-twitter"></i></a>
                  <a href="#"><i className="icon ion-social-facebook fa fa-facebook"></i></a></div>
                <ul className="list-inline">
                    <li className="list-inline-item"><a href="/">Home</a></li>
                    <li className="list-inline-item"><a href="#">About</a></li>
                    <li className="list-inline-item"><a href="#">Terms</a></li>
                    <li className="list-inline-item"><a href="#">Privacy Policy</a></li>
                </ul>
                <p className="copyright">Company Name © 2018</p>
            </footer>
        </div>
      </div>
    </Router>
  )
}



function mapStateToProps(state) {
  // console.log('======= app', state)
  return {
      logout: state.logout,
      currentUser: state.currentUser,
      errorMessage: state.errorMessage,
  }
}

export default connect(mapStateToProps, {logout, getCurrentUser, getWorks}) (App);
