import filterFactory, {
  textFilter,
  numberFilter,
} from "react-bootstrap-table2-filter";
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import BootstrapTable from "react-bootstrap-table-next";
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import "../stylesheets/SupplyList.css";
import SupplyForm from "./SupplyForm.js";
import Card from "react-bootstrap/Card";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
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
    is_validated: true
  },
  {
    index: 2,
    supplier: "Test supplier",
    name: "Test Bigas",
    region: "National Capital Region",
    address: "Test address",
    quantity: 3,
    unit: "kg",
    price: 3000,
    description: "Test description",
    is_validated: true
  },
  {
    index: 3,
    supplier: "Test supplier",
    name: "Test Banana",
    region: "Cordillera Administrative Region",
    address: "Test address",
    quantity: 4,
    unit: "kg",
    price: 2000,
    description: "Test description",
    is_validated: true
  },
];
const columns = [
  {
    dataField: "index",
    text: "ID",
    searchable: false,
  },
  {
    dataField: "name",
    text: "Name"
  },
  {
    dataField: "region",
    text: "Region",
    sort: true,
    searchable: false,
    filter: textFilter(),
  },
  {
    dataField: "address",
    text: "Address",
    searchable: false,
  },
  {
    dataField: "quantity",
    text: "Quantity",
    sort: true,
    searchable: false,
    filter: textFilter(),
  },
  {
    dataField: "unit",
    text: "Unit",
    searchable: false,
  },
  {
    dataField: "price",
    text: "Price",
    sort: true,
    searchable: false,
    filter: textFilter(),
  },
  {
    dataField: "description",
    searchable: false,
    text: "Description",
  },
];

const pagination = paginationFactory({
  totalSize: supplies.length,
  sizePerPage: 5,
});

let state = false;
const TableSearch = (props) => {
    let input;
    const handleClick = () => {
        if (state) {
          props.onClear();
          input.value = '';
        }
        else props.onSearch(input.value);
        state = !state;
    }
    return (
        <Container>
            <Row>
                <Col sm={8}></Col>
                <Col sm={4}>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Search Supply"
                            ref={ n => input = n }/>
                        <InputGroup.Append>
                            <Button
                              variant="outline-secondary"
                              onClick={ handleClick }>
                              { state? 'Clear': 'Search' }
                            </Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Col>
            </Row>
        </Container>
    );
};

function SupplyList({ auth }) {
  return (
    <div className="SupplyList">
      <div>
        <Jumbotron className="text-center">
          <h1>Supply List</h1>
        </Jumbotron>
      </div>
      <Container>
        <Card className='main-card'>
          <Card.Body>
            <ToolkitProvider
              keyField='index'
                data={ supplies }
                columns={ columns }
                search
            >
              {
                props => (
                    <div>
                        <TableSearch { ...props.searchProps } />
                        <BootstrapTable
                          { ...props.baseProps }
                          bordered={false}
                          pagination={pagination}
                          filter={filterFactory()}
                          bootstrap4
                          filterPosition="bottom"
                        />
                    </div>
                )
              }
            </ToolkitProvider>
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
