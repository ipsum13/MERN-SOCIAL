import React, {useState} from 'react';
import { connect } from 'react-redux';
import { addComment } from '../../../../actions/post'

import {CardHeader, Button } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import Avatar from '@material-ui/core/Avatar'
// import Icon from '@material-ui/core/Icon'

import {makeStyles} from '@material-ui/core/styles'

// import {Link} from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  cardHeader: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  },
  smallAvatar: {
    width: 25,
    height: 25
  },
  commentField: {
    width: '96%'
  },
  commentText: {
    backgroundColor: 'white',
    padding: theme.spacing(1),
    margin: `2px ${theme.spacing(2)}px 2px 2px`
  },
  commentDate: {
    display: 'block',
    color: 'gray',
    fontSize: '0.8em'
 },
 commentDelete: {
   fontSize: '1.6em',
   verticalAlign: 'middle',
   cursor: 'pointer'
 }
}))

const CommentItem = ({ postId, addComment }) => {
  const classes = useStyles()
  const [text, setText] = useState('')
    return (<div>
         <form
        className='form my-1'
        onSubmit={e => {
          e.preventDefault();
          addComment(postId, { text });
          setText('');
        }}
      >
        <CardHeader
              avatar={
                <Avatar className={classes.smallAvatar} src={Avatar}/>
              }
              title={ <TextField
                
                multiline
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder="Write something ..."
                className={classes.commentField}
                margin="normal"
                />}
              className={classes.cardHeader}
              
        />
        <Button type='submit' value='Submit'>Comment</Button>
        </form>
    </div>)
}

export default connect(null, { addComment })(CommentItem);