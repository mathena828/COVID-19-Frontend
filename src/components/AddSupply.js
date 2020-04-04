import React, { useState } from "react";
import { useStep } from "react-hooks-helper";
import Jumbotron from "react-bootstrap/Jumbotron";
import OrgForm from "./OrgForm.js";
import SupplyForm from "./SupplyForm.js";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import axios from "axios";

const steps = [{ id: "organization" }, { id: "supplies" }, { id: "submit" }];

<<<<<<< HEAD
function handleSubmit(orgName, firstName,lastName,email, phone, supplies){
    
    var name = firstName + " " + lastName;
    let body = {organization:orgName,
                name: name, 
                mobile:phone,
                email: email};
    fetch("http://localhost:8000/api/supplier/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(body)
    }).then((response)=>{
        return response.json();
    }).then((data) => {
        console.log(data);
    });
=======
function handleSubmit(orgName, firstName, lastName, email, phone, supplies) {
  const supplier = {
    organization: orgName,
    first_name: firstName,
    last_name: lastName,
    email: email,
    mobile: phone
  };
  axios.post("http://localhost:8000/api/supplier/", supplier);
  for (var i = 0; i < supplies.length; i++) {
    const supply = {
      supplier: orgName,
      name: supplies[i].index,
      region: supplies[i].region,
      address: supplies[i].address,
      quantity: supplies[i].quantity,
      unit: supplies[i].unit,
      price: supplies[i].price,
      description: supplies[i].description
    };
    axios.post("http://localhost:8000/api/supply/", supply);
  }
}
export default function AddSupply() {
  const { step, navigation } = useStep({ initialStep: 0, steps });
  /* const [formData, setForm] = useForm(defaultData); */
  /*  const props2 = { formData, setForm, navigation }; */
  const [orgName, setOrgName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const props = {
    orgName,
    setOrgName,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    phone,
    setPhone,
    navigation
  };

  const [supplies, setSupplies] = useState([]);

  const props2 = {
    orgName,
    firstName,
    lastName,
    email,
    phone,
    supplies,
    setSupplies,
    navigation,
    handleSubmit
  };

  const { id } = step;
  switch (id) {
    case "organization":
      return <OrgForm {...props} />;
    case "supplies":
      return <SupplyForm {...props2} />;
    case "submit":
      return (
        <div>
          <Jumbotron>
            <h1>Thank you for your donation!</h1>
            <p>
              Thanks for helping out our LGUs. Please keep your email and phone
              at the ready if an LGU would like to purchase your supplies.
            </p>
            <Link to="/">
              <Button>Back To Home</Button>
            </Link>
          </Jumbotron>
        </div>
      );
    default:
      return null;
  }
>>>>>>> e48cef3b11b15344c1b5363c1bc404699057b904
}
