import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
// import {unfollow, follow} from './api-user.js'

export default function FollowProfileButton (props) {

    return (<div>
      { props.following
        ? (<Button variant="contained" color="secondary" onClick={props.onUnfollowClick}>Unfollow</Button>)
        : (<Button variant="contained" color="primary" onClick={props.onFollowClick}>Follow</Button>)
      }
    </div>)
}
FollowProfileButton.propTypes = {
  following: PropTypes.bool.isRequired,
  onButtonClick: PropTypes.func.isRequired
}