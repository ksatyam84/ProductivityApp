import React from 'react';
import {Link} from 'react-router-dom';
import Timeline from './Timeline';
import '../css/homepage.css'

const Homepage = ({currentUser}) => {
  if(!currentUser.isAuthenticated) {
    return (
      <div>
        <div className="cta">
          <h1>Welcome to Forum</h1>
          <Link to="/signup" className="btn btn-outline-dark">Sign Up</Link>
        </div>
        <Timeline />
      </div>
    );
  }
  return (
    <div>
      <Timeline />
    </div>
  );
};

export default Homepage;