import React, { useState } from 'react';
//import { Link } from 'react-router-dom';

import '../stylesheets/LoginRegister.css';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from "axios";

async function handleRegSubmit(username, password, confirmPassword, email, mobile, dept){
    if (password !== confirmPassword){
        alert("Please ensure your password and confirm password are the same.");
        return false;
    }
    const regUser = {
        "username": username,
        "email": email,
        "password":password,
        "mobile":mobile,
        "department":dept
    } 
    await axios.post("http://localhost:8000/api/auth/register", regUser)
    .catch((error)=>{console.log(error.message)});

}
export default function LoginRegister(){
    const [regUsername, setRegUsername]=useState("");
    const [regPassword, setRegPassword]=useState("");
    const [regConfirmPassword, setRegConfirmPassword] = useState("");
    const [regEmail, setRegEmail] = useState("");
    const [regMobile, setRegMobile] = useState("");
    const [regDept, setRegDept] = useState("");

    return(
        <div className="LoginRegister">
            <div className="container">
                <div className="row">
                    <div className="col-sm-6 left">
                        <h4 >Login to account...</h4>
                        <Form>
                            <Form.Group>
                                <Form.Label>Username</Form.Label>
                                <Form.Control />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" />
                            </Form.Group>
                            <Button>Login</Button>
                        </Form>
                    </div>
                    <div className="col-sm-6 right">
                        <h4 style={{textAlign:"right"}}>...Or register if you don't have one yet</h4>
                        <Form  onSubmit={(e)=>{handleRegSubmit(regUsername, regPassword, regConfirmPassword, regEmail, regMobile, regDept);e.preventDefault();}}>
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
                    </div>
                </div>

            </div>
        </div>

    );
}