import React, { useEffect } from "react";
import { connect } from "react-redux";

import Card from "@material-ui/core/Card";
// import { Avatar } from '@material-ui/core'
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import CommentIcon from "@material-ui/icons/Comment";
import { ThumbDown, ThumbUp } from "@material-ui/icons";
import Divider from "@material-ui/core/Divider";
//import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
//import { Link } from "react-router-dom";
// import {remove, like, unlike} from './api-post.js'
//import PostCard from "../../../Dashboard/components/PostCard";

import {
  getPost,
  deletePost,
  removeLike,
  addLike,
} from "../../../../actions/post";

import CommentItem from "../CommentItem";
import CommentList from "../CommentList";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 700,
    margin: "auto",
    marginBottom: theme.spacing(1),
    backgroundColor: "rgba(0, 0, 0, 0.06)",
  },
  cardContent: {
    backgroundColor: "white",
    padding: `${theme.spacing(2)}px 0px`,
  },
  cardHeader: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  text: {
    margin: theme.spacing(2),
  },
  photo: {
    textAlign: "center",
    backgroundColor: "#f2f5f4",
    padding: theme.spacing(1),
  },
  media: {
    height: 200,
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const PostItem = ({ getPost, deletePost, removeLike, addLike, post: { post, loading }, match }) => {
  var path = window.location.pathname;
  var id =path.substr(path.lastIndexOf("/") + 1);
  useEffect(() => {
    getPost(id);
  }, [getPost, id]); 
  //const p = getPost(id);
 
  //console.log();
  const classes = useStyles();

  return (loading || post === null ? (
   <h4>No post</h4>
  ) : (
 
    <Card className={classes.card}>
      <CardHeader
        avatar={<Avatar src={Avatar} />}
       /*  action={
          <IconButton onClick={() => deletePost(post._id)}>
            <DeleteIcon />
          </IconButton>
        } */
        title={post.name}
        subheader={new Date(post.date).toDateString()}
        className={classes.cardHeader}
      />
      <CardContent className={classes.cardContent}>
        <Typography component="p" className={classes.text}>
          {post.text}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton
          onClick={() => addLike(post._id)}
          className={classes.button}
          aria-label="Like"
          color="secondary"
        >
          <ThumbUp />
        </IconButton>{" "}
        <span>{post.likes.length > 0 && <span>{post.likes.length}</span>}</span>
        <IconButton
          onClick={() => removeLike(post._id)}
          className={classes.button}
          aria-label="Unlike"
          color="secondary"
        >
          <ThumbDown />
        </IconButton>{" "}
        <span> </span>
        <IconButton
          className={classes.button}
          aria-label="Comment"
          color="secondary"
        >
          <CommentIcon />
        </IconButton>{" "}
        {post.comments.length > 0 && (
          <span className="comment-count">{post.comments.length}</span>
        )}
      </CardActions>
      <CommentItem postId={post._id} comments={post.comments} />
      <div>
        {post.comments.map((comment) => (
          <CommentList key={comment._id} comment={comment} postId={post._id} />
        ))}
      </div> 
      
      <Divider />

      
      </Card>
   
  ))
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, {
  getPost, deletePost, removeLike, addLike
})(PostItem);

