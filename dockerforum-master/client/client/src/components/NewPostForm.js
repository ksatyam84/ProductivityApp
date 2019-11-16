import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {newPost} from '../store/actions/posts';

class NewPostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: ''
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.newPost(this.state.title, this.state.body, this.props.currentUser.user.id);
    this.props.history.push('/');
  };

  render() {
    const {title, body} = this.state;

    if(this.props.currentUser.isAuthenticated) {
      return (
        <div className="container">
          <h2>New Post</h2>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input type="text" className="form-control" value={title}
              id="title" name="title" onChange={this.handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="body">Body</label>
              <textarea type="text" className="form-control" value={body}
              id="body" name="body" onChange={this.handleChange} />
            </div>
            <button className="btn btn-outline-dark btn-lg" type="submit">
              Submit Post
            </button>
          </form>
        </div>
      );
    }

    return (
      <div>
        <h4>You must <Link to="/signup">sign up</Link> to create a new post.</h4>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps, {newPost})(NewPostForm);