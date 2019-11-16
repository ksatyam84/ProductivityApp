import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {deleteComment, getPost} from '../store/actions/posts';

class Comment extends PureComponent {
  clearComment = () => {
    this.props.deleteComment(this.props.post._id, this.props.id);
    this.props.getPost(this.props.post._id);
  }

  render() {
    const {text, author, currentUser} = this.props;

    return (
      <div>
        <li className="list-group-item comment">
          <p>{text}</p>
          {currentUser.isAuthenticated && (
            author === currentUser.user.id && (
              <a className="delete text-muted" onClick={this.clearComment}>Delete</a>
            )
          )}
        </li>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    post: state.post,
    currentUser: state.currentUser
  };
};

export default connect(mapStateToProps, {deleteComment, getPost})(Comment);