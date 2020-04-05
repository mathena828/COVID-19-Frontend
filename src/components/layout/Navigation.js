import React from "react";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';

import { logout } from '../../actions/auth';
import PropTypes from "prop-types";
function Navigation({auth, logout}){
    const { isAuthenticated, user } = auth;
    const authLinks = (
        <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
            <li className="nav-item">
                <Button onClick={logout} variant="outline-info" className="nav-link text-light">
                    Logout
                </Button>
                {/* <button className="nav-link btn btn-info btn-sm text-light">
                    Logout
                </button> */}
            </li>
        </ul>
    );
    const guestLinks = (
        <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
            <li className="nav-item">
            <Link to="/register" className="nav-link">
                Register
            </Link>
            </li>
            <li className="nav-item">
            <Link to="/login" className="nav-link">
                Login
            </Link>
            </li>
        </ul>
    );

    return(
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">

            <div className="container">
                <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarTogglerDemo01"
                aria-controls="navbarTogglerDemo01"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                <a className="navbar-brand" href="#">
                    Agri
                </a>
            </div>
            {isAuthenticated ? authLinks : guestLinks}
            </div>
        </nav>
    );
};
Navigation.propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
};

const mapStateToProps = state =>({
    auth:state.auth
})
export default connect(mapStateToProps, {logout})(Navigation);