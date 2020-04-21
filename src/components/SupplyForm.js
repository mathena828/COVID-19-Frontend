import React, { useState } from "react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Jumbotron from "react-bootstrap/Jumbotron";
import { CaretLeft } from "react-bootstrap-icons";

//import Modal from 'react-bootstrap/Modal';

import "../stylesheets/formStyle.css";

var indexCount = 0;
const SupplyForm = ({
  orgName,
  firstName,
  lastName,
  email,
  phone,
  supplies,
  setSupplies,
  navigation,
  handleSubmit,
}) => {
  const [formRegion, setRegion] = useState("National Capital Region");
  const [unit, setUnit] = useState("gram");
  const [formName, setFormName] = useState("");
  const [formAddress, setFormAddress] = useState("");
  const [formAmount, setFormAmount] = useState(1);
  const [formPrice, setFormPrice] = useState(0);
  const [formDescription, setFormDescription] = useState("");

  const { previous } = navigation;
  const { next } = navigation;

  //const [show, setShow] = useState(false);

  //const handleClose = () => setShow(false);
  //const handleShow = () => setShow(true);

  var supplyList = supplies.map((supply) => {
    return (
      <Card key={supply.index}>
        <Card.Body>
          <Card.Title>
            <b>Supply Name:</b> {supply.name}
            <div style={{ textAlign: "right" }}>
              <Button
                onClick={() => deleteSupply(supply.index)}
                variant="outline-danger"
              >
                <svg
                  className="bi bi-trash"
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M5.5 5.5A.5.5 0 016 6v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm2.5 0a.5.5 0 01.5.5v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm3 .5a.5.5 0 00-1 0v6a.5.5 0 001 0V6z" />
                  <path
                    fillRule="evenodd"
                    d="M14.5 3a1 1 0 01-1 1H13v9a2 2 0 01-2 2H5a2 2 0 01-2-2V4h-.5a1 1 0 01-1-1V2a1 1 0 011-1H6a1 1 0 011-1h2a1 1 0 011 1h3.5a1 1 0 011 1v1zM4.118 4L4 4.059V13a1 1 0 001 1h6a1 1 0 001-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                    clipRule="evenodd"
                  />
                </svg>
              </Button>
            </div>
          </Card.Title>
          <Card.Subtitle>
            <b>Address:</b> {supply.address}, {supply.region} <br></br>
            <b>Quantity:</b> {supply.amount} {supply.unit}s <br></br>
            <b>Price:</b> PHP {supply.price} per {supply.unit} <br></br>
          </Card.Subtitle>
          <hr />
          <b>Description</b>
          <p className="supply-description">{supply.description}</p>
        </Card.Body>
      </Card>
    );
  });
  //fields = ('id','supplier','name','address','region','quantity','unit','price','description','is_validated')

  function saveSupply(name, address, region, unit, amount, price, description) {
    var newSupply = {
      name: name,
      address: address,
      amount: amount,
      unit: unit,
      region: region,
      price: price,
      description: description,
      index: indexCount,
    };
    indexCount += 1;
    setSupplies([...supplies, newSupply]);
  }

  function deleteSupply(supplyIndex) {
    const newSupplies = supplies.filter((_, index) => index !== supplyIndex);

    setSupplies(newSupplies);
  }

  return (
    <div className="SupplyForm">
      <div>
        <Jumbotron className="jumbo-header">
          <div className="container jumbo-description">
            <p className="jumbo-title">SUPPLY INFORMATION</p>
            <Link to="/" style={{ textDecoration: "none" }}>
              <p className="jumbo-instructions">
                <CaretLeft></CaretLeft>Go back to the home page.
              </p>
            </Link>
          </div>
        </Jumbotron>
      </div>
      <div className="container">
        <Form
          onSubmit={(e) => {
            handleSubmit(orgName, firstName, lastName, email, phone, supplies);
            e.preventDefault();
          }}
        >
          <Form.Label>General Information</Form.Label>
          <Form.Group className="container row">
            <Form.Control
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              type="text"
              className="col-sm-5"
              placeholder="Supply Name"
            />
          </Form.Group>
          <Form.Group>
            <div className="container">
              <div className="row">
                <Form.Control
                  value={formAddress}
                  onChange={(e) => setFormAddress(e.target.value)}
                  type="text"
                  placeholder="Address"
                  className="col-sm-7 mr-3 mt-2"
                />
                <Form.Control
                  value={formRegion}
                  as="select"
                  onChange={(e) => setRegion(e.target.value)}
                  className="col-sm mt-2"
                >
                  <option>NCR</option>
                  <option>Region I</option>
                  <option>Region II</option>
                  <option>CAR</option>
                  <option>Region III</option>
                  <option>Region IV-A</option>
                  <option>Mimaropa</option>
                  <option>Region V</option>
                  <option>Region VI</option>
                  <option>Region VII</option>
                  <option>Region VIII</option>
                  <option>Region IX</option>
                  <option>Region X</option>
                  <option>Region XI</option>
                  <option>Region XII</option>
                  <option>Region XIII</option>
                  <option>BARMM</option>
                </Form.Control>
              </div>
            </div>

            <Form.Text className="text-muted">
              * Where will the <b>drop-off point</b> be?
            </Form.Text>
          </Form.Group>

          <Form.Group>
            <Form.Label>Quantity & Price</Form.Label>
            <div className="container">
              <div className="row">
                <div className="col-sm-6">
                  <div class="row">
                    <Form.Control
                      value={formAmount}
                      onChange={(e) => setFormAmount(e.target.value)}
                      className="col-sm-4  mr-3 mt-2"
                      type="number"
                      placeholder="Amount"
                    />
                    <Form.Control
                      className="col-sm-4 mt-2"
                      as="select"
                      value={unit}
                      onChange={(e) => setUnit(e.target.value)}
                    >
                      <option>g</option>
                      <option>kg</option>
                      <option>ml</option>
                      <option>liter</option>
                      <option>m</option>
                      <option>unit</option>
                    </Form.Control>
                  </div>
                </div>
                <div className="col-sm-6 mt-2">
                  <Form.Control
                    value={formPrice}
                    onChange={(e) => {
                      setFormPrice(e.target.value);
                    }}
                    type="number"
                    placeholder="Price in PHP"
                  />
                  <Form.Text className="text-muted">
                    * Answer with the <b>price per unit</b>.
                  </Form.Text>
                </div>
              </div>
            </div>
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              placeholder="Write a brief description here."
              value={formDescription}
              onChange={(e) => setFormDescription(e.target.value)}
              as="textarea"
              rows="3"
            />
          </Form.Group>

          <Button
            onClick={(e) =>
              saveSupply(
                formName,
                formAddress,
                formRegion,
                unit,
                formAmount,
                formPrice,
                formDescription
              )
            }
            variant="outline-secondary"
          >
            Add Item
          </Button>

          <br></br>
          <br></br>
          {supplyList}
          <br></br>
          <Button onClick={previous} className="mr-3">
            <svg
              className="bi bi-arrow-left"
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M5.854 4.646a.5.5 0 010 .708L3.207 8l2.647 2.646a.5.5 0 01-.708.708l-3-3a.5.5 0 010-.708l3-3a.5.5 0 01.708 0z"
                clipRule="evenodd"
              />
              <path
                fillRule="evenodd"
                d="M2.5 8a.5.5 0 01.5-.5h10.5a.5.5 0 010 1H3a.5.5 0 01-.5-.5z"
                clipRule="evenodd"
              />
            </svg>
            Previous
          </Button>
          <Button type="submit" onClick={next}>Submit</Button>
        </Form>

        {/* {supplyList}
        <div className="container">
          <div className="row">
            <div className="col-md" style={{ textAlign: "left" }}>
              <Button onClick={previous}>
                <svg
                  className="bi bi-arrow-left"
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.854 4.646a.5.5 0 010 .708L3.207 8l2.647 2.646a.5.5 0 01-.708.708l-3-3a.5.5 0 010-.708l3-3a.5.5 0 01.708 0z"
                    clipRule="evenodd"
                  />
                  <path
                    fillRule="evenodd"
                    d="M2.5 8a.5.5 0 01.5-.5h10.5a.5.5 0 010 1H3a.5.5 0 01-.5-.5z"
                    clipRule="evenodd"
                  />
                </svg>
                Previous
              </Button>
            </div>
          </div>
        </div> */}
      </div>

      {/* <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Submit Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>Please double check the information you are about to submit.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={next}>
            Save and Submit
          </Button>
        </Modal.Footer>
      </Modal> */}
    </div>
  );
};

export default SupplyForm;
