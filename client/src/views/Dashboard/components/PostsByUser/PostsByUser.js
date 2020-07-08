import React, { useEffect } from 'react';
import { connect } from 'react-redux';
//import PropTypes from 'prop-types';
import PostCard from '../PostCard';


import { getPostsByUser } from '../../../../actions/post';

const PostsByUser = ({ getPostsByUser, post: { postsByUser, loading } }) => {
  let path = window.location.pathname;
  var id = path.substr(path.lastIndexOf("/") + 1);
  useEffect(() => {
    getPostsByUser(id);
  }, [getPostsByUser, id]);

    return (loading || postsByUser.length === 0 ? (
      ""
    ) : (
  
      <div style={{marginTop: '24px'}}>
        {postsByUser.map((post, i) => {
            return <PostCard post={post} key={post._id} />
          })
        }
      </div>
    ))
}

const mapStateToProps = (state) => ({
  post: state.post
});

export default connect(mapStateToProps, { getPostsByUser })(PostsByUser);