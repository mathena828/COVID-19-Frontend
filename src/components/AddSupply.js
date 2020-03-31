import React, { useState } from 'react';
import {useForm, useStep} from 'react-hooks-helper';

import OrgForm from './OrgForm.js';
import SupplyForm from './SupplyForm.js';
const steps = [
    { id: "organization" },
    { id: "supplies" },
    { id: "review" },
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
        case "review":
            return (<h1>REVIEW1</h1>);
        case "submit":
            return (<h1> SUBMIT </h1>);
        default:
            return null;
    }
}