import React, { useEffect, useState } from 'react';
import { AppBar, Avatar, Typography, Button, Toolbar } from "@material-ui/core";
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

import useStyles from "./styles";
import { LOGOUT } from '../../constants/actionTypes';

function Navbar() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

    useEffect(() => {
        const token = user?.token;
        if (token) {
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) {
                handleLogout();
            }
        }
        setUser(JSON.parse(localStorage.getItem("profile")));
    }, [location]);


    const handleLogout = () => {
        dispatch({ type: LOGOUT });
        history.push("/auth");
        setUser(null);
    }

    return (
        <AppBar
            className={classes.appBar}
            position="static"
            color="inherit">

            <Link to="/" className={classes.brandContainer}>

                <img
                    src="/images/memoriesText.png"
                    alt="memories"
                    component={Link}
                    to="/"
                    height="45px"
                />

                <img
                    className={classes.image}
                    src="/images/memoriesLogo.png"
                    alt="memories"
                    height="40px"
                />

            </Link>

            <Toolbar className={classes.toolbar}>
                {user?.result ? (
                    <div className={classes.profile}>

                        <Avatar
                            className={classes.purple}
                            src={user?.result?.imageUrl}
                            alt={user?.result?.name}>
                            {user?.result?.name?.charAt(0).toUpperCase()}
                        </Avatar>

                        <Typography
                            className={classes.userName}
                            variant="h6">
                            {user?.result?.name}
                        </Typography>

                        <Button
                            variant="contained"
                            className={classes.logout}
                            color="secondary"
                            onClick={handleLogout}>
                            Logout
                        </Button>

                    </div>
                ) : (
                    <Button
                        component={Link}
                        to="/auth"
                        variant="contained"
                        color="primary">
                        Sign in
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar
// id - 661266389081-n3lv86ldp29kp83v7t101p63ik70ocjq.apps.googleusercontent.com
// secret - wjuf4IR8SXnfIy7OGO49Z42s
