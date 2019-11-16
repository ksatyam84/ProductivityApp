import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchPosts} from '../store/actions/posts';
import PostItem from '../components/PostItem';

class PostList extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    const {posts} = this.props;

    if(posts) {
      let postList = posts.map(p => (
        <PostItem 
          title={p.title}
          body={p.body}
          key={p._id}
          id={p._id}
        />
      ));
      return (
        <div>
          <ul className="list-group postlist">
            {postList}
          </ul>
        </div>
      ); 
    }
    return (
      <div>No posts</div>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
    currentUser: state.currentUser
  };
}

export default connect(mapStateToProps, {fetchPosts})(PostList);