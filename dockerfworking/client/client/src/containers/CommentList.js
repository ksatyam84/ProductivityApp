import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import Comment from '../components/Comment';
import '../css/comments.css';

class CommentList extends PureComponent {
  render() {
    const {post} = this.props;

    if(true) {
      let commentList = post.comments.map(c => (
        <Comment text={c.text} key={c._id} id={c._id} author={c.author}/>
      ));
      return (
        <div className="comment-list">
          <h3>Comments</h3>
          <ul className="list-group">
            {commentList}
          </ul>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    post: state.post
  };
};

export default connect(mapStateToProps)(CommentList);