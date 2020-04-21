import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../stylesheets/formStyle.css";
import { Link } from "react-router-dom";

import Jumbotron from "react-bootstrap/Jumbotron";
import { CaretLeft } from "react-bootstrap-icons";

const OrgForm = ({
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
}) => {
  const { next } = navigation;

  return (
    <div className="OrgForm">
      <div>
        <Jumbotron className="jumbo-header">
          <div className="container jumbo-description">
            <p className="jumbo-title">SUPPLIER INFORMATION</p>
            <Link to="/" style={{ textDecoration: "none" }}>
              <p className="jumbo-instructions">
                <CaretLeft></CaretLeft>
                Go back to the home page.
              </p>
            </Link>
          </div>
        </Jumbotron>
      </div>
      <div className="container">
        <Form>
          <Form.Label>Organization</Form.Label>
          <Form.Group>
            <Form.Control
              value={orgName}
              className="col-sm-6"
              onChange={(e) => setOrgName(e.target.value)}
              type="text"
              placeholder="Organization Name"
            />
            <Form.Text className="text-muted">
              * <b>Independent</b> if you are not affiliated with any
              organization.
            </Form.Text>
          </Form.Group>
          <Form.Label>Representative</Form.Label>
          <Form.Group className="container">
            <div className="row">
              <Form.Control
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="col-sm-4 mr-5 mt-2"
                type="text"
                placeholder="First Name"
              />
              <Form.Control
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="col-sm-4 mt-2"
                type="text"
                placeholder="Last Name"
              />
            </div>
          </Form.Group>
          <Form.Label>Contact Information</Form.Label>
          <Form.Group className="container">
            <div className="row">
              <Form.Control
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="col-sm-4 mr-5 mt-2"
                type="text"
                placeholder="Phone Number"
              />
              <Form.Control
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="col-sm-4 mt-2"
                type="email"
                placeholder="Email"
              />
            </div>
          </Form.Group>
          <Button onClick={next} className="mb-4">
            Next
            <svg
              className="bi bi-arrow-right"
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.146 4.646a.5.5 0 01.708 0l3 3a.5.5 0 010 .708l-3 3a.5.5 0 01-.708-.708L12.793 8l-2.647-2.646a.5.5 0 010-.708z"
                clipRule="evenodd"
              />
              <path
                fillRule="evenodd"
                d="M2 8a.5.5 0 01.5-.5H13a.5.5 0 010 1H2.5A.5.5 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </Button>{" "}
        </Form>
      </div>
    </div>
  );
};

export default OrgForm;
