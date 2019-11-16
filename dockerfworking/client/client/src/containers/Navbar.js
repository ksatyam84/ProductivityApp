import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {logout} from '../store/actions/auth';
import '../css/navbar.css'

class Navbar extends Component {
  logout = e => {
    e.preventDefault();
    this.props.logout();
  }

  render() {
    return (
      <nav className="navbar navbar-expand">
        <div className="container">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand">
              Forum
            </Link>
          </div>
            {this.props.currentUser.isAuthenticated ? (
              <ul className="nav navbar-nav navbar-right">
                <li className="px-3">
                  <Link to="/new">New Post</Link>
                </li>
                <li className="px-3">
                  <a onClick={this.logout}>Log out</a>
                </li>
              </ul>
            ) : (
              <ul className="nav navbar-nav navbar-right">
                <li className="px-3">
                  <Link to="/signup">Sign up</Link>
                </li>
                <li className="px-3">
                  <Link to="/signin">Log in</Link>
                </li>
              </ul>
            )}
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  };
}

export default connect(mapStateToProps, {logout})(Navbar);