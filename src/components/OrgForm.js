import React from 'react';
import { useForm } from 'react-hook-form'

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../stylesheets/formStyle.css';
import { Link } from 'react-router-dom';


import Jumbotron from 'react-bootstrap/Jumbotron';

const OrgForm = ({ orgName, setOrgName, firstName, setFirstName, lastName, setLastName, email, setEmail, phone, setPhone,navigation })=>{
    const { register, errors, handleSubmit } = useForm();
    const {go} = navigation;
    const onSubmit = data => { console.log(data); go("supplies"); }

    return(
        <div className ="OrgForm">
        <div>
                <Jumbotron>
                    <Link to="/"><Button variant="outline-secondary">Back to Home</Button></Link>
                   <h3>Hi, thank you for registering your produce to the site. 
                       Just answer this form and we'll be good to go!</h3> 
                </Jumbotron>
        </div>
        <div className="container">
            
            <Form onSubmit={handleSubmit(onSubmit)}>
                <h3>Organization Information</h3>
                <Form.Label>Organization</Form.Label>
                <Form.Group>
                    
                    <Form.Control 
                    name="orgName"
                    ref={register({ required: true, maxLength: 128 })}
                    value={orgName}
                    className="col-sm-6"
                    onChange={e=>setOrgName(e.target.value)}
                    type="text" placeholder="Organization Name" />

                    <Form.Text className="text-muted">
                        Answer "Independent" if under no organization.
                    </Form.Text>
                </Form.Group>
                <Form.Label>Representative</Form.Label>
                <Form.Group className="container">

                    <div className="row">
                        <Form.Group>
                        <Form.Control 
                        name="firstName"
                        ref = {register}
                        value={firstName}
                        onChange={e=>setFirstName(e.target.value)}
                        type="text" placeholder="First Name" />
                        </Form.Group>
                        <Form.Group>
                        <Form.Control 
                        name="lastName"
                        ref={register({required: 'Required'})}
                        value={lastName}
                        onChange={e=>setLastName(e.target.value)}
                        type="text" placeholder="Last Name" />
                        </Form.Group>
                    </div>
                </Form.Group>
                <Form.Label>Contact Information</Form.Label>
                <Form.Group className="container">
                    
                    <div className="row">
                    <Form.Group>
                    <Form.Control
                    name="phone" 
                    value={phone}
                    ref={register({required: 'Required'})}
                    onChange={e=>setPhone(e.target.value)}
                    type="text" placeholder="Phone Number" />
                    </Form.Group>
                    <Form.Group>
                    <Form.Control 
                    name="email"
                    value={email}
                    ref={register({
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                          message: "invalid email address"
                        }
                    })}
                    onChange={e=>{setEmail(e.target.value);}}
                    type="email" placeholder="Email" />
                    {errors.email && errors.email.message}
                    </Form.Group>
                    </div>  
                </Form.Group>
                <Button type="submit" variant="info">Next
            <svg className="bi bi-arrow-right" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path fillRule="evenodd" d="M10.146 4.646a.5.5 0 01.708 0l3 3a.5.5 0 010 .708l-3 3a.5.5 0 01-.708-.708L12.793 8l-2.647-2.646a.5.5 0 010-.708z" clipRule="evenodd"/>
  <path fillRule="evenodd" d="M2 8a.5.5 0 01.5-.5H13a.5.5 0 010 1H2.5A.5.5 0 012 8z" clipRule="evenodd"/>
</svg>
            </Button>{' '}
            </Form>
            <div className="container">
                <div className="row">
                
                </div>
            </div>

        </div>
        </div>
    );
}

export default OrgForm;