import filterFactory, {
  textFilter,
  numberFilter,
} from "react-bootstrap-table2-filter";
import {
  CaretLeftFill,
  CaretRightFill,
} from 'react-bootstrap-icons';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import paginationFactory, { PaginationProvider } from "react-bootstrap-table2-paginator";
import BootstrapTable from "react-bootstrap-table-next";
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import "../stylesheets/SupplyList.css";
import SupplyForm from "./SupplyForm.js";
import Card from "react-bootstrap/Card";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PropTypes from "prop-types";
import axios from "axios";

const columns = [
  {
    dataField: "id",
    text: "ID",
    sort: true,
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
];

async function fetchSupplier (id) {
  let returnData = {};
  try {
    const supplier = await axios
      .get(`http://localhost:8000/api/supplier/${id}`);
    const { data, status } = supplier;
    if (status !== 200) throw new Error("Error in getSupply call.");
    returnData = data;
  } catch (e) {
    console.log(e);
    returnData = false;
  }
  return returnData;
}

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
  const [supplies, setSupplies] = useState([]);
  const [supplier, setSupplier] = useState({});

  const options = {
    custom: true,
    totalSize: supplies.length,
    sizePerPage: 5,
  };

  const getTotalPages = (size, sizePerPage) => Math.ceil(size/sizePerPage);

  const expandRow = {
    onlyOneExpanding: true,
    animate: false,
    onExpand: async (row, isExpand, rowIndex, e) => {
      const supplier = await fetchSupplier(row.supplier);
      setSupplier(supplier);
    },
    renderer: row => (
      <Container>
        <Row>
          <Col sm={4}>
            <p>{`Supply Address: ${row.address}`}</p>
            <p>{`Supply Description: ${row.description}`}</p>
          </Col>
          <Col sm={8}>
            <p>{`Supplier: ${supplier.first_name} ${supplier.last_name}`}</p>
            <p>{`Organization: ${supplier.organization}`}</p>
            <p>Contact Information:</p>
            <p>{`Mobile Number - ${supplier.mobile}`}</p>
            <p>{`Email - ${supplier.email}`}</p>
          </Col>
        </Row>
      </Container>
    ),
  };

  const handleNextPage = ({ page, onPageChange }) => () => {
    const resultingPage = page + 1;
    if (resultingPage <= getTotalPages(supplies.length, 5)) onPageChange(resultingPage);
  };

  const handlePrevPage = ({ page, onPageChange }) => () => {
    const resultingPage = page - 1;
    if (resultingPage > 0 ) onPageChange(resultingPage);
  };

  const handleSizePerPage = ({ page, onSizePerPageChange }, newSizePerPage) => {
    onSizePerPageChange(newSizePerPage, page);
  };

  useEffect(() => {
    async function fetchSupplies() {
      let returnData = [];
      try {
        const getSupply = await axios.get("http://localhost:8000/api/supply");
        const { data, status } = getSupply;
        if (status !== 200) throw new Error("Error in getSupply call.");
        setSupplies(data);
      } catch (e) {
        console.log(e);
      }
    }
    fetchSupplies();
  }, []);

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
              keyField='id'
              data={ supplies }
              columns={ columns }
              search
            >
              {
                props => (
                    <div>
                        <TableSearch { ...props.searchProps } />
                        <PaginationProvider
                          pagination={ paginationFactory(options) }>
                          {
                            ({
                              paginationProps,
                              paginationTableProps
                            }) => (
                              <Container>
                                <Row>
                                  <Col sm={12}>
                                    <BootstrapTable
                                      { ...props.baseProps }
                                      bordered={ false }
                                      filter={ filterFactory() }
                                      expandRow={ expandRow }
                                      bootstrap4
                                      filterPosition="bottom"
                                      { ...paginationTableProps }
                                    />
                                  </Col>
                                  <Col sm={9}></Col>
                                  <Col sm={1}>
                                    <CaretLeftFill onClick={ handlePrevPage(paginationProps) }/>
                                  </Col>
                                  <Col sm={1}>{ paginationProps.page }</Col>
                                  <Col sm={1}>
                                    <CaretRightFill onClick={ handleNextPage(paginationProps) }/>
                                  </Col>
                                </Row>
                              </Container>
                            )
                          }
                        </PaginationProvider>
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
