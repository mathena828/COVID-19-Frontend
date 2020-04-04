import React from 'react';
//import { Link } from 'react-router-dom';

import '../stylesheets/LoginRegister.css';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
export default function LoginRegister(){
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
                        <Form>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control placeholder="juandelacruz@gmail.com" />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Username</Form.Label>
                                <Form.Control />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Contact Number</Form.Label>
                                <Form.Control className="col-sm-4" type="number" />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password" />
                            </Form.Group>
                            <Button>Register</Button>
                        </Form>
                    </div>
                </div>

            </div>
        </div>

    );
}