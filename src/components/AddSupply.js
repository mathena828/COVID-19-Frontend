import React, { useState } from 'react';
import {useForm, useStep} from 'react-hooks-helper';
import Jumbotron from 'react-bootstrap/Jumbotron';
import OrgForm from './OrgForm.js';
import SupplyForm from './SupplyForm.js';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const steps = [
    { id: "organization" },
    { id: "supplies" },
    { id: "submit" }
  ];
const defaultData={
    organization:'',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    supplies:{}
}
export default function AddSupply(){
    const {step, navigation} = useStep({ initialStep: 0, steps });
    const [formData, setForm] = useForm(defaultData);
    const props = { formData, setForm, navigation };
    const { id } = step;
    switch(id){
        case "organization":
            return <OrgForm {...props}/>;
        case "supplies":
            return <SupplyForm {...props}/>
        case "submit":
            return(
                <div>
                    <Jumbotron>
                        <h1>Thank you for your donation!</h1>
                        <p>Thanks for helping out our LGUs. Please keep your email and phone at the ready if an LGU would like to purchase your supplies.</p>
                        <Link to="/"><Button>Back To Home</Button></Link>
                    </Jumbotron>
                </div>
            );
        default:
            return null;
    }
}