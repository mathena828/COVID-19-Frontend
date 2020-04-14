import React, { useState } from 'react';
//import { Link } from 'react-router-dom';

import '../stylesheets/LoginRegister.css';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {login} from '../actions/auth';

function Login({login, isAuthenticated}){
    const [logUsername, setLogUsername] = useState("");
    const [logPassword, setLogPassword] = useState("");
    if(isAuthenticated){
        return <Redirect to="/supply-list"/>;
    }
    return(
        <div className="Login col-md-6 m-auto">
            <div className="card card-body mt-5">
            <h4 >Login to account</h4>
            <Form onSubmit = {(e)=>{ e.preventDefault();login(logUsername,logPassword);}}>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                    value={logUsername}
                    onChange={(e)=>{setLogUsername(e.target.value)}}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" 
                    value={logPassword}
                    onChange={(e)=>{setLogPassword(e.target.value)}}/>
                </Form.Group>
                <Button type="submit">Login</Button>
            </Form>
            <p>Don't have an account yet? Register <Link to="/register">here.</Link></p>
            </div>
        </div>
    )
}
Login.propTypes={
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, 
    { login })
    (Login);