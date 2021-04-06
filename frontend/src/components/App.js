import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route, Link, useParams, NavLink, } from "react-router-dom";
import history from '../history';
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
import {logout, getCurrentUser} from '../actions';
import { connect } from 'react-redux';



class App extends Component {
  constructor(props) {
      super(props);
  }

  
  handleLogout() {
    this.props.logout()
  }

  componentDidMount() {
    this.props.getCurrentUser()
  }

  render() {
    const {currentUser} = this.props;
    let navItem;
    let navItem2;
    if (localStorage.getItem('token') === null) {
      navItem = <NavLink to="/login" activeClassName="selected">Login</NavLink>
      navItem2 = <NavLink to="/registration" activeClassName="selected">Registration</NavLink>
    } else {
      navItem = <NavLink to={`/users/${currentUser.id}`} activeClassName='selected'>My Profile</NavLink>
      navItem2 = <NavLink to="#" onClick={() => this.handleLogout()}>Logout</NavLink>
    }
    return (
      <Router history={history}>
        <div>
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="navbar-brand"><NavLink exact to="/"><img className='navbar-img' src='/quill-drawing-a-line.svg' /></NavLink></div>
          {/* <a className="navbar-brand" href="#">Navbar</a> */}
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <NavLink exact to="/" activeClassName="selected">Home</NavLink>
              </li>
              <li className="nav-item">
                {navItem}
                {/* <NavLink to="/login" activeClassName="selected">Login</NavLink> */}
              </li>
              <li className='nav-item'>
                {navItem2}
                {/* <NavLink to="/registration" activeClassName="selected">Registration</NavLink> */}
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0">
              <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
              <button className="btn btn-outline my-2 my-sm-0" type="submit">Search</button>
            </form>
          </div>
        </nav>
          {/* <nav className='navbar-container'>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/registration">Registration</Link>
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0">
              <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
              <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
          </nav> */}

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
            <Route path="/works/:workId/chapters/:chapterId" component={Chapter}></Route>
            <Route path="/works/:workId" component={Work}></Route>
            
            
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/registration">
              <Registration />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
            
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
}



function mapStateToProps(state) {
  console.log('======= app', state)
  return {
      logout: state.logout,
      currentUser: state.currentUser,
  }
}

export default connect(mapStateToProps, {logout, getCurrentUser}) (App);
