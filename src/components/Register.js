import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
//handleRegSubmit(regUsername, regPassword, regConfirmPassword, regEmail, regMobile, regDept);
function Register(){
    const [regUsername, setRegUsername]=useState("");
    const [regPassword, setRegPassword]=useState("");
    const [regConfirmPassword, setRegConfirmPassword] = useState("");
    const [regEmail, setRegEmail] = useState("");
    const [regMobile, setRegMobile] = useState("");
    const [regDept, setRegDept] = useState("");
    return(
        <div className="Register">
            <h4 >Create an account</h4>
            <Form  onSubmit={(e)=>{e.preventDefault();}}>
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

export default Register;