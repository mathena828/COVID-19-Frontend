import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link, Redirect } from 'react-router-dom';
import {register} from '../actions/auth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

//handleRegSubmit(regUsername, regPassword, regConfirmPassword, regEmail, regMobile, regDept);
function Register({register, isAuthenticated}){
    const [regUsername, setRegUsername]=useState("");
    const [regPassword, setRegPassword]=useState("");
    const [regConfirmPassword, setRegConfirmPassword] = useState("");
    const [regEmail, setRegEmail] = useState("");
    const [regMobile, setRegMobile] = useState("");
    const [regDept, setRegDept] = useState("");
    if(isAuthenticated){
        return <Redirect to="/supply-list"/>;
    }
    return(
        <div className="Register">
            <h4 >Create an account</h4>
            <Form onSubmit = {
                (e)=>{ 
                    console.log("hello");
                    e.preventDefault();
                    register(regEmail, regUsername, regMobile, regDept, regPassword, regConfirmPassword);
                }
            }>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                        type="email"
                        value={regEmail}
                        onChange={e=>{setRegEmail(e.target.value)}} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                    value={regUsername}
                    onChange={e=>{setRegUsername(e.target.value)}}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Mobile Number</Form.Label>
                    <Form.Control 
                    value={regMobile}
                    onChange={e=>{setRegMobile(e.target.value)}}
                    className="col-sm-4" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Department</Form.Label>
                    <Form.Control 
                    value={regDept}
                    onChange={e=>{setRegDept(e.target.value)}}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password"
                    value={regPassword}
                    onChange={e=>{setRegPassword(e.target.value)}} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control 
                    value={regConfirmPassword}
                    onChange={e=>{setRegConfirmPassword(e.target.value)}}
                    type="password" />
                </Form.Group>
                <Button type="submit">Register</Button>
            </Form>
            <p> Already have an account? <Link to="/login">Log in</Link></p>
        </div>
    )
}

Register.propTypes={
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, 
    { register })
    (Register);
