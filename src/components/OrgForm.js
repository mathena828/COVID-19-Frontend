import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../stylesheets/formStyle.css'

import Jumbotron from 'react-bootstrap/Jumbotron';

const OrgForm = ({ setForm, formData, navigation })=>{
    const {next} = navigation;
    return(
        <div>
        <div>
                <Jumbotron>
                   <h3>Hi, thank you for registering your produce to the site, it's going to help a lot of people. 
                       Just answer this form and we'll be good to go!</h3> 
                   </Jumbotron>
        </div>
        <div className="container">
            
            <Form >
                <h3>Organization Information</h3>
                <Form.Group>
                    <Form.Label>Organization</Form.Label>
                    <Form.Control type="text" placeholder="Organization Name" />
                    <Form.Text className="text-muted">
                        Answer "Independent" if under no organization.
                    </Form.Text>
                </Form.Group>
                <Form.Label>Representative</Form.Label>
                <Form.Group className="container">

                    <div className="row">
                        <Form.Control className="col-sm" type="text" placeholder="First Name" />
                        <Form.Control className="col-sm" type="text" placeholder="Last Name" />
                    </div>
                </Form.Group>
                <Form.Label>Contact Information</Form.Label>
                <Form.Group className="container">
                    
                    <div className="row">
                    
                    <Form.Control className="col-sm-4" type="number" placeholder="Phone Number" />
                    <Form.Control className="col-sm-4"type="email" placeholder="Email" />
                    </div>  
                </Form.Group>
                
            </Form>
            <div className="container">
                <div className="row">
                <Button onClick={next} variant="info">Next
            <svg class="bi bi-arrow-right" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" d="M10.146 4.646a.5.5 0 01.708 0l3 3a.5.5 0 010 .708l-3 3a.5.5 0 01-.708-.708L12.793 8l-2.647-2.646a.5.5 0 010-.708z" clip-rule="evenodd"/>
  <path fill-rule="evenodd" d="M2 8a.5.5 0 01.5-.5H13a.5.5 0 010 1H2.5A.5.5 0 012 8z" clip-rule="evenodd"/>
</svg>
            </Button>{' '}
                </div>
            </div>

        </div>
        </div>
    );
}

export default OrgForm;