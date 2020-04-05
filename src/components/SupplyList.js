import filterFactory, {
  textFilter,
  numberFilter,
} from "react-bootstrap-table2-filter";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import BootstrapTable from "react-bootstrap-table-next";
import CardColumns from "react-bootstrap/CardColumns";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import "../stylesheets/SupplyList.css";
import SupplyForm from "./SupplyForm.js";
import Card from "react-bootstrap/Card";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const supplies = [
  {
    index: 1,
    supplier: "Test supplier",
    name: "Test Card",
    region: "National Capital Region",
    address: "Test address",
    quantity: 5,
    unit: "kg",
    price: 1000,
    description: "Test description",
    is_validated: true,
  },
  {
    index: 2,
    supplier: "Test supplier",
    name: "Test Card",
    region: "National Capital Region",
    address: "Test address",
    quantity: 3,
    unit: "kg",
    price: 3000,
    description: "Test description",
    is_validated: true,
  },
  {
    index: 3,
    supplier: "Test supplier",
    name: "Test Card",
    region: "National Capital Region",
    address: "Test address",
    quantity: 4,
    unit: "kg",
    price: 2000,
    description: "Test description",
    is_validated: true,
  },
];
const columns = [
  {
    dataField: "index",
    text: "ID",
    filter: textFilter(),
  },
  {
    dataField: "name",
    text: "Supply",
    filter: textFilter(),
  },
  {
    dataField: "region",
    text: "Current Region",
    filter: textFilter(),
  },
  {
    dataField: "address",
    text: "Current Location",
    filter: textFilter(),
  },
  {
    dataField: "quantity",
    text: "Quantity",
    sort: true,
    filter: textFilter(),
  },
  {
    dataField: "unit",
    text: "Unit",
  },
  {
    dataField: "price",
    text: "Price",
    sort: true,
    filter: textFilter(),
  },
  {
    dataField: "description",
    text: "Description",
  },
];
const pagination = paginationFactory({
  totalSize: supplies.length,
  sizePerPage: 5,
});

var supplyList = supplies.map((supply) => {
  var totalPrice = 1000;
  return (
    <Card key={supply.index}>
      <Card.Body>
        <Card.Title>
          Item Name: {supply.name}
          <div style={{ textAlign: "right" }}>
            <Button
              onClick={() => console.log(supply.index)}
              variant="outline-danger"
            >
              <svg
                class="bi bi-trash"
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M5.5 5.5A.5.5 0 016 6v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm2.5 0a.5.5 0 01.5.5v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm3 .5a.5.5 0 00-1 0v6a.5.5 0 001 0V6z" />
                <path
                  fill-rule="evenodd"
                  d="M14.5 3a1 1 0 01-1 1H13v9a2 2 0 01-2 2H5a2 2 0 01-2-2V4h-.5a1 1 0 01-1-1V2a1 1 0 011-1H6a1 1 0 011-1h2a1 1 0 011 1h3.5a1 1 0 011 1v1zM4.118 4L4 4.059V13a1 1 0 001 1h6a1 1 0 001-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                  clip-rule="evenodd"
                />
              </svg>
            </Button>
          </div>
        </Card.Title>
        <Card.Subtitle>Address: {supply.address}</Card.Subtitle>
        <hr />
        <p>Description</p>
        <p className="supply-description">{supply.description}</p>
        <Card.Subtitle>
          {supply.amount} for Php{totalPrice}
        </Card.Subtitle>
      </Card.Body>
    </Card>
  );
});

function SupplyList({ auth }) {
  return (
    <div className="SupplyList">
      <div>
        <Jumbotron className="text-center">
          <h1>Supply List</h1>
        </Jumbotron>
      </div>
      <Container>
        <Card>
          <Card.Body>
            <BootstrapTable
              keyField="index"
              data={supplies}
              columns={columns}
              bordered={false}
              pagination={pagination}
              filter={filterFactory()}
              bootstrap4
            />
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

SupplyList.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(SupplyList);
