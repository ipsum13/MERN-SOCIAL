import React from "react";
import { connect } from "react-redux";
import { deleteComment } from "../../../../actions/post";

import { CardContent} from "@material-ui/core";
//import TextField from "@material-ui/core/TextField";
//import Avatar from "@material-ui/core/Avatar";
import Icon from "@material-ui/core/Icon";
//import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  cardHeader: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  smallAvatar: {
    width: 25,
    height: 25,
  },
  commentField: {
    width: "96%",
  },
  commentText: {
    backgroundColor: "white",
    padding: theme.spacing(0),
    margin: `2px ${theme.spacing(2)}px 2px 2px`,
  },
  commentDate: {
    display: "block",
    color: "gray",
    fontSize: "0.8em",
  },
  commentDelete: {
    fontSize: "1.6em",
    verticalAlign: "middle",
    cursor: "pointer",
  },
}));

const CommentList = ({
  postId,
  comment: { _id, text, name, avatar, user, date },
  auth,
  deleteComment,
}) => {
  const classes = useStyles();

  return (
  <CardContent>
      <p className={classes.commentText}>
        <Link to={"/profile/" + postId}>{name}</Link>
        <br />
        {text}
        <span className={classes.commentDate}>
          {new Date(date).toDateString()} |
          {!auth.loading && user === auth.user._id && (
            <Icon
              onClick={() => deleteComment(postId, _id)}
              className={classes.commentDelete}
            >
              delete
            </Icon>
          )}
        </span>
      </p>
    </CardContent>
    );
   
    
  
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteComment })(CommentList);
