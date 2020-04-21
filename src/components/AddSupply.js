import React, { useState } from "react";
import { useStep } from "react-hooks-helper";
import OrgForm from "./OrgForm.js";
import SupplyForm from "./SupplyForm.js";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import "../stylesheets/AddSupply.css";

const steps = [{ id: "organization" }, { id: "supplies" }, { id: "submit" }];

async function handleSubmit(
  orgName,
  firstName,
  lastName,
  email,
  phone,
  supplies
) {
  const supplier = {
    organization: orgName,
    first_name: firstName,
    last_name: lastName,
    email: email,
    mobile: phone,
  };

  await axios
    .post("http://localhost:8000/api/supplier/", supplier)
    .then((res) => {
      var resID = res.data.id;
      for (var i = 0; i < supplies.length; i++) {
        var supply = supplies[i];
        console.log(supply.name);
        var num = supply["price"].toFixed(2);
        const supplyRequest = {
          supplier: resID,
          name: supply["name"],
          address: supply["address"],
          region: "NCR",
          quantity: 1,
          unit: "unit",
          price: num,
          description: supply["description"],
        };
        console.log(JSON.stringify(supplyRequest));
        axios
          .post("http://localhost:8000/api/supply/", supplyRequest)
          .catch((error) => {
            console.log(error.message);
          });
      }
      return console.log(res.data);
    })
    .catch((error) => {
      console.log(error.message);
    });
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
    navigation,
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
    handleSubmit,
  };

  const { id } = step;
  switch (id) {
    case "organization":
      return <OrgForm {...props} />;
    case "supplies":
      return <SupplyForm {...props2} />;
    case "submit":
      return (
        <div className="container thank-you-message">
          <div class="thank-you-message-text">
            <h1 className="thank-you-message-title">THANK YOU</h1>
            <p className="thank-you-message-description">
              Please keep your email and phone at the ready in case an LGU would
              like to purchase your supplies.
            </p>
          </div>
          <hr></hr>
          <Link to="/">
            <Button>Back To Home</Button>
          </Link>
        </div>
      );
    default:
      return null;
  }
}
