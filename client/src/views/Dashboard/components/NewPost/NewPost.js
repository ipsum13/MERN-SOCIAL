import React, { useState } from "react";
import { connect } from "react-redux";
import { addPost } from "../../../../actions/post";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Icon from "@material-ui/core/Icon";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import {PhotoCamera, GifTwoTone } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#efefef",
    padding: `${theme.spacing(3)}px 0px 1px`,
  },
  card: {
    maxWidth: 700,
    margin: "auto",
    marginBottom: theme.spacing(1),
    backgroundColor: "rgba(65, 150, 136, 0.09)",
    boxShadow: "none",
  },
  cardContent: {
    backgroundColor: "white",
    paddingTop: 0,
    paddingBottom: 0,
  },
  cardHeader: {
    paddingTop: 8,
    paddingBottom: 8,
  },
  photoButton: {
    height: 30,
    marginBottom: 5,
  },
  input: {
    display: "none",
  },
  textField: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    width: "90%",
  },
  submit: {
    margin: theme.spacing(2),
  },
  filename: {
    verticalAlign: "super",
  },
}));

const NewPost = ({ profile: {profile}, addPost }) => {
  const classes = useStyles();
  const [text, setText] = useState("");
  const [values, setValues] = useState({
    text: "",
    photo: "",
    error: "",
    user: {},
  });
  
  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    setValues({ ...values, [name]: value });
  };
 
  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardHeader
          avatar={<Avatar src={profile && profile.profilePic} />}
          title={values.user.name}
          className={classes.cardHeader}
        />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addPost({ text });
            setText("");
          }}
        >
          <CardContent className={classes.cardContent}>
            <TextField
              placeholder="Share your thoughts ..."
              multiline
              rows="3"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className={classes.textField}
              margin="normal"
            />
            <input
              accept="image/*"
              onChange={handleChange("photo")}
              className={classes.input}
              id="icon-button-file"
              type="file"
            />
            <label htmlFor="icon-button-file">
              <IconButton
                color="secondary"
                className={classes.photoButton}
                component="span"
              >
                <PhotoCamera />
              </IconButton>
            </label>{" "}
            <span className={classes.filename}>
              {values.photo ? values.photo.name : ""}
            </span>
            <IconButton
                color="secondary"
                className={classes.photoButton}
                component="span"
              >
                <GifTwoTone />
              </IconButton>
            {values.error && (
              <Typography component="p" color="error">
                <Icon color="error" className={classes.error}>
                  error
                </Icon>
                {values.error}
              </Typography>
            )}
          </CardContent>
          <CardActions>
            <Button
              color="primary"
              variant="contained"
              disabled={text === ""}
              className={classes.submit}
              type="submit"
            >
              POST
            </Button>
          </CardActions>
        </form>
      </Card>
    </div>
  );
};

NewPost.propTypes = {
  addPost: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(mapStateToProps, { addPost })(NewPost);
