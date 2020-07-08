import React, {useState} from 'react';
import { connect } from 'react-redux';
import { deleteAccount } from "../../../../actions/profile";
//import PropTypes from 'prop-types'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import {Redirect} from 'react-router-dom'

const DeleteProfile = ({ deleteAccount }) => {
  const [open, setOpen] = useState(false)
  const [redirect, setRedirect] = useState(false)
  
  const clickButton = () => {
    setOpen(true)
  }
  const deleteAction = () => { 
    deleteAccount();
    setRedirect(true);
  }
  const handleRequestClose = () => {
    setOpen(false)
  }

    if (redirect) {
      return <Redirect to='/signup'/>
    }
    return (<span>
      <IconButton aria-label="Delete" onClick={clickButton} color="secondary">
        <DeleteIcon/>
      </IconButton>

      <Dialog open={open} onClose={handleRequestClose}>
        <DialogTitle>{"Delete Account"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Confirm to delete your account.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRequestClose} color="primary">
            Cancel
          </Button>
          <Button onClick={deleteAction} color="secondary" autoFocus="autoFocus">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </span>)
}

export default connect(null, { deleteAccount })(DeleteProfile);