import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class AuthForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: ''
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const authType = this.props.signUp ? 'signup' : 'signin';
    this.props.onAuth(authType, this.state).then(() => {
      this.props.history.push('/');
    }).catch(() => {
      return;
    });
  };

  render() {
    const {email, username, password} = this.state;
    const {signUp, heading, errors, history, removeError} = this.props;

    history.listen(() => {
      removeError();
    });

    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <h2>{heading}</h2>
          {errors.message && <div className="alert alert-danger">{errors.message}</div>}
          {signUp && (
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" className="form-control" value={email} 
              id="email" name="email" onChange={this.handleChange} />
            </div>
          )}
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" className="form-control" value={username} 
            id="username" name="username" onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" value={password} 
            id="password" name="password" onChange={this.handleChange} />
          </div>
          <button className="btn btn-outline-dark btn-lg" type="submit">
            {heading}
          </button>
        </form>
        {signUp && (
          <p className="mt-2 text-right">Already have an account? <Link to='/signin'>Sign in</Link></p>
        )}
        {!signUp && (
          <p className="mt-2 text-right">Don't have an account yet? <Link to='/signup'>Sign up</Link></p>
        )}
      </div>
    );
  }
}

export default AuthForm;