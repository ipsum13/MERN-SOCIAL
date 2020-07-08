import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { logout } from '../../../../actions/auth';
import { connect } from 'react-redux';
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { AppBar, Toolbar, Badge, Hidden, IconButton, Avatar, Divider } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/NotificationsOutlined";
// import InputIcon from "@material-ui/icons/Input";
import { ExitToApp } from "@material-ui/icons";

// import Menubar from "./components";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";


const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: "none",
  },
  flexGrow: {
    flexGrow: 1,
  },
  signOutButton: {
    marginLeft: theme.spacing(1),
  },
}));

const Topbar = ({ logout, auth, className, onSidebarOpen, ...rest }) => {
  //const {  } = props;

  const classes = useStyles();

  const [notifications] = useState([]);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar {...rest} className={clsx(classes.root, className)}>
      <Toolbar>
        <RouterLink to="/">
          <h3 style={{color: 'white'}}>Home</h3>
        </RouterLink>
        <div className={classes.flexGrow} />
        <Hidden mdDown>
          <IconButton color="inherit">
            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton
            className={classes.signOutButton}
            color="inherit"
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <ExitToApp />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
           
          >
            <MenuItem onClick={handleClose}><span style={{marginRight: '10px'}}><Avatar src={auth.user && auth.user.avatar}/></span>{auth.user && auth.user.name}</MenuItem>
            <Divider />
            <MenuItem onClick={logout}>Logout @{auth.user && auth.user.name}</MenuItem>
          </Menu>
        </Hidden>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onSidebarOpen}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func,
};

const mapStateToProps = state => ({
  auth: state.auth
  
})

export default connect(mapStateToProps, {logout})(Topbar);
