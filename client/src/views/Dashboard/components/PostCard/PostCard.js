import React from "react";
import { connect } from "react-redux";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

//import CommentIcon from "@material-ui/icons/Comment";
import { ThumbDown, ThumbUp } from "@material-ui/icons";
import Divider from "@material-ui/core/Divider";
//import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
// import {remove, like, unlike} from './api-post.js'

import { addLike, removeLike, deletePost } from "../../../../actions/post";


const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 700,
   margin: 'auto',
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

const PostCard = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  post: { _id, text, name, avatar, user, likes, comments, date },
}) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={<Avatar src={avatar} />}
        action={
          auth.user._id === user &&
          <IconButton onClick={() => deletePost(_id)}>
            <DeleteIcon />
          </IconButton>
        }
        
        title={name}
        
        subheader={new Date(date).toDateString()}
        className={classes.cardHeader}
      />
      <CardContent className={classes.cardContent}>
        <Typography component="p" className={classes.text}>
          {text}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton
          onClick={() => addLike(_id)}
          className={classes.button}
          aria-label="Like"
          color="secondary"
        >
          <ThumbUp />
        </IconButton>{" "}
        <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
        
        <IconButton
          onClick={() => removeLike(_id)}
          className={classes.button}
          aria-label="Unlike"
          color="secondary"
        >
          <ThumbDown />
        </IconButton>
        {" "}
        <span> </span>
        <Link to={`/posts/${_id}`}>
          Comment
        </Link>{" "}
        {comments.length > 0 && (
          <span className="comment-count">{comments.length}</span>
        )}
      </CardActions>
      <Divider />
      
    </Card>
  );
};

PostCard.defaultProps = {
  showActions: true
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostCard
);
