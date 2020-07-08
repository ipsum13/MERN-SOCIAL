import React, { useEffect } from 'react';
import Spinner from '../../../../layouts/Spinner'
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import PostCard from '../PostCard';

import { getPosts } from '../../../../actions/post';

const PostList = ({ getPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

    return (loading || posts.length === 0 ? (
      <Spinner />
    ) : (
  
      <div style={{marginTop: '5rem'}}>
        {posts.map((post, i) => {
            return <PostCard post={post} key={post._id} />
          })
        }
      </div>
    ))
}

const mapStateToProps = (state) => ({
  post: state.post
});

export default connect(mapStateToProps, { getPosts })(PostList);