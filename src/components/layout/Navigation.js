import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import "../../stylesheets/Navigation.css";
import Navbar from "react-bootstrap/Navbar";

function Navigation({ auth, logout }) {
  const { isAuthenticated } = auth;
  const authLinks = (
    <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
      <li className="nav-item">
        <Link to="/supply-list" className="nav-link">
          Supplies
        </Link>
      </li>
      <li className="nav-item">
        <Button
          className="nav-link text-light"
          onClick={(e) => {
            e.preventDefault();
            logout();
          }}
        >
          Logout
        </Button>
      </li>
    </ul>
  );
  const guestLinks = (
    <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
      {/* <li className="nav-item">
        <Link to="/register" className="nav-link">
          Register
        </Link>
      </li> */}
      <li className="nav-item">
        <Link to="/login" className="nav-link">
          Login
        </Link>
      </li>
    </ul>
  );

  return (
    <Navbar className="navbar navbar-expand-sm navbar-dark bg-primary">
      <Navbar.Brand>
        <Link to="/" className="navbar-brand">
          AgriLink
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        {isAuthenticated ? authLinks : guestLinks}
      </Navbar.Collapse>
    </Navbar>
  );
}

Navigation.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logout })(Navigation);
