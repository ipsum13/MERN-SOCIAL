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
import { YouTube } from "@material-ui/icons";

import "./NewPost.css";

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
  youtubeButton: {
    height: 30,
    marginBottom: 5,
    color: "#FF0000",
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

const NewPost = ({ profile: { profile }, addPost }) => {
  const classes = useStyles();
  const [text, setText] = useState("");
  const [link, setLink] = useState("");
  const [youtube, setYoutube] = useState(false);
  const [values, setValues] = useState({
    text: "",
    photo: "",
    error: "",
    user: {},
    link: ""
  });


  const toggleYoutubeInput = () => {
    setYoutube(!youtube);
    console.log("youtube");
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
            addPost({ text, link });
            setText("");
            setLink("")
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
              name="extra"
              id="extra"
              className={"youtube-" + (youtube ? "show" : "hide")}
              placeholder="https://www.youtube.com/watch?v=dO368WjwyFs"
              onChange={(e) => setLink(e.target.value)}
            />
            <button
              type="button"
              onClick={toggleYoutubeInput}
              style={{ border: "none", background: "#fff" }}
              
            >
              <IconButton className={classes.youtubeButton} component="span">
                <YouTube />
              </IconButton>
            </button>{" "}
            
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
const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { addPost })(NewPost);
