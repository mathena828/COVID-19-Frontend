import React, { useState } from "react";
import { useStep } from "react-hooks-helper";
import Jumbotron from "react-bootstrap/Jumbotron";
import OrgForm from "./OrgForm.js";
import SupplyForm from "./SupplyForm.js";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import axios from "axios";

const steps = [{ id: "organization" }, { id: "supplies" }, { id: "submit" }];

function handleSubmit(orgName, firstName, lastName, email, phone, supplies) {
  const supplier = {
    organization: orgName,
    first_name: firstName,
    last_name: lastName,
    email: email,
    mobile: phone
  };
  
  axios.post("http://localhost:8000/api/supplier/", supplier).then(res=>{
  console.log(res.data);
  var resID = res.data.id;
  for (var supply in supplies) {
    const supplyRequest = {
      supplier:resID,
      name:"no matter",
      address:"noooooooooo",
      region:"NCR",
      quantity:1,
      unit:"unit",
      price:"0.00",
      description:"lorem"
      /* supplier: 1,
      name: supply.name,
      address: supply.address,
      region: supply.region,
      quantity: supply.amount,
      unit: supply.unit,
      price: supply.price,
      description: supply.description, */
    };
    console.log(JSON.stringify(supplyRequest));
    axios.post("http://localhost:8000/api/supply/", supplyRequest);
  }
  return res.data});
  
}
export default function AddSupply() {
  const { step, navigation } = useStep({ initialStep: 0, steps });
  const [orgName, setOrgName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [supplies, setSupplies] = useState([]);
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
}
