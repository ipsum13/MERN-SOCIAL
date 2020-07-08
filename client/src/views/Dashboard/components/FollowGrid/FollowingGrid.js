import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getProfileById } from '../../../../actions/profile'
import {makeStyles} from '@material-ui/core/styles'
//import PropTypes from 'prop-types'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import {Link} from 'react-router-dom'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(2),
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    background: theme.palette.background.paper,
  },
  bigAvatar: {
    width: 60,
    height: 60,
    margin: 'auto'
  },
  gridList: {
    width: 500,
    height: 220,
  },
  tileText: {
    textAlign: 'center',
    marginTop: 10
  }
}))
const FollowGrid = ({ getProfileById, profile: { profile },
  auth, },  props) => {
  var path = window.location.pathname;
  var id = path.substr(path.lastIndexOf("/") + 1);
  useEffect(() => {
    getProfileById(id);
    //let follow = checkFollow();
    //setValues({...values, following: follow})
    // checkFollow()

  }, [getProfileById, id]);
  const classes = useStyles()
    return (<div className={classes.root}>
      <GridList cellHeight={160} className={classes.gridList} cols={4}>
        {!profile ? '' : profile.following.map((person, i) => {
           return  <GridListTile style={{'height':120}} key={i}>
              <Link to={"/profile/" + person.user}>
                <Avatar src={person.avatar} className={classes.bigAvatar}/>
                <Typography className={classes.tileText}>{person.name}</Typography>
              </Link>
            </GridListTile>
        })}
      </GridList>
    </div>)
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
})

export default connect(mapStateToProps, { getProfileById })(FollowGrid)