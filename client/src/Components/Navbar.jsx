import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import Logout from './Logout';
const Navbar = () => {
  return (
    <>
        <AppBar>
            <Toolbar>
                <Typography variant='h4' sx={{flexGrow:1}}>Siddhant Nagaria</Typography>
                <Button variant="contained" to='/login' component={Link}>Login</Button>
                <Button variant="contained"to='/signup' component={Link}>Signup</Button>
                <Logout/>
            </Toolbar>
        </AppBar>
    </>
  )
}

export default Navbar