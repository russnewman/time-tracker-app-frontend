import React from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink
} from './NavbarElements';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import AuthService from "../../services/auth.service"



const useStyles = makeStyles((theme) => ({
  navbar:{
    // position: 'relative',
    // top: '0px',
    // left: '0px',
    // position: 'fixed',
    // top: '0px',
    // width: '100%',
    marginBottom: '-1px'
  }
}));

const handleLogOut = e =>{
  AuthService.logout()
}

const Navbar = () => {
  const user = AuthService.getCurrentUser().userInfo;
  const classes = useStyles();
  return (
    <>
      <Nav  className={classes.navbar}>
        <Bars />
        <NavMenu>
          <NavLink to='/dashboard' activeStyle>
            Dashboard
          </NavLink>

          {user.userRole === "LEADER" ?
              (<NavLink to='/employees' activeStyle>
                Employees
              </NavLink>)
              :
              (<NavLink to='/leaders' activeStyle>
                Managers
              </NavLink>)
          }
          <NavLink to='/profile' activeStyle>
            Profile
          </NavLink>
        </NavMenu>

          <Link to={'/sign-in'} variant="body2">
              <Button variant="contained" color="secondary" onClick={handleLogOut}>Sign Out</Button>   
          </Link>

      </Nav>
    </>
  );
};

export default Navbar;
