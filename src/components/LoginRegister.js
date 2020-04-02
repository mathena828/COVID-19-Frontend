import React from 'react';

import '../stylesheets/LoginRegister.css';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
export default function LoginRegister(){
    return(
        <div className="LoginRegister">
            <div className="container">
                <div className="row">
                    <div className="col-sm-6 left">
                        <h4>LOGIN TO ACCOUNT</h4>
                        <Form>
                            <Form.Group>
                                <Form.Label>Username</Form.Label>
                                <Form.Control placeholder="Username" />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Enter Password" />
                            </Form.Group>
                            <Button>Login</Button>
                        </Form>
                    </div>
                    <div className="col-sm-6 right">
                        <h4>OR  REGISTER IF YOU DON'T HAVE ONE YET</h4>
                        <Form>
                            <Form.Group>
                                <Form.Label>Username</Form.Label>
                                <Form.Control placeholder="Username" />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Username</Form.Label>
                                <Form.Control placeholder="Username" />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Enter Password" />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password" placeholder="Confirm Password" />
                            </Form.Group>
                            <Button>Register</Button>
                        </Form>
                    </div>
                </div>

            </div>
        </div>

    );
}