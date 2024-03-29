import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom';

import { LOGOUT } from '../../constants/constantsType';
import usImgPath from '../../images/us.png';
import useStyles from './styles';

const Navbar = () => {
  const classes = useStyles();
  const location = useLocation();
  const dispatch = useDispatch();

  const initUserState = JSON.parse(localStorage.getItem('userInfo'));
  const [user, setUser] = useState(initUserState);

  const logout = (info) => {
    dispatch({ type: LOGOUT, payload: null });
    setUser(null);
    if (info) {
      window.location = `/login/${info}`;
    } else {
      window.location = `/login`;
    }
  }

  useEffect(() => {
    setUser(initUserState);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">Galleria</Typography>
        <img className={classes.image} src={usImgPath} alt="icon" height="60" />
      </div>
      <Toolbar className={classes.toolbar}>
        {
          user ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user.name} src={user.imageUrl}>{user.name.toUpperCase().charAt(0)}</Avatar>
            <Typography className={classes.userName} variant="h6">{user.name}</Typography>
            <Button onClick={() => logout()} variant="contained" className={classes.logout} color="secondary">Logout</Button>
          </div>
          ) : (
            <Button component={Link} to="/login" variant="contained" color="primary">Login</Button>
          )
        }
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;