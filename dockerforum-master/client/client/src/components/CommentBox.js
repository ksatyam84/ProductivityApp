import React, {Component} from 'react';
import {connect} from 'react-redux';
import {newComment, getPost} from '../store/actions/posts';

class CommentBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: ''
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      comment: ''
    });
    this.props.newComment(this.state.comment, this.props.post._id, this.props.currentUser.user.id)
      .then(() => this.props.getPost(this.props.post._id));
  };
  
  render() {
    const {comment} = this.state;

    return (
      <div>
        <h3>Leave a comment</h3>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input type="text" className="form-control" value={comment}
            id="comment" name="comment" onChange={this.handleChange} />
          </div>
          <button className="btn btn-outline-dark" type="submit">
            Submit comment
          </button>
        </form> 
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    post: state.post
  }
}

export default connect(mapStateToProps, {newComment, getPost})(CommentBox);