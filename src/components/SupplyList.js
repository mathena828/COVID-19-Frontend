import filterFactory, {
  textFilter,
  numberFilter,
} from "react-bootstrap-table2-filter";
import {
  Archive,
  InfoCircle,
  CaretLeft,
  CaretLeftFill,
  CaretRight,
  CaretRightFill,
} from 'react-bootstrap-icons';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import paginationFactory, { PaginationProvider } from "react-bootstrap-table2-paginator";
import BootstrapTable from "react-bootstrap-table-next";
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import React, { useState, useEffect } from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Dropdown from 'react-bootstrap/Dropdown'
import Button from "react-bootstrap/Button";
import "../stylesheets/SupplyList.css";
import SupplyForm from "./SupplyForm.js";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
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

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href=""
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
  </a>
));

const CustomMenu = React.forwardRef(
  ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
    const [value, setValue] = useState('');

    return (
      <div
        ref={ref}
        style={style}
        className={className}
        aria-labelledby={labeledBy}
      >
        <ul className="list-unstyled">
          {React.Children.toArray(children).filter(
            (child) =>
              !value || child.props.children.toLowerCase().startsWith(value),
          )}
        </ul>
      </div>
    );
  },
);


const TableSearch = (props) => {
  const [searching, setSearching] = useState(false);
  let input;
  const handleClick = () => {
    if (searching) {
      props.onClear();
      input.value = '';
    }
    else props.onSearch(input.value);
    setSearching(!searching);
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
                { searching? 'Clear': 'Search' }
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
  const [sizesPerPageSettings, setSizesPerPageSettings] =
    useState([true, false, false, false, false, false]);

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
          <Col sm={8}>
            <Form className="row-information">
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Description
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    as="textarea"
                    placeholder="Supply Description"
                    value={row.address}
                    disabled />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Address
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    placeholder="Supply Address"
                    value={row.address}
                    disabled />
                </Col>
              </Form.Group>
            </Form>
          </Col>
          <Col sm={4}>
            <Container className="row-information">
              <Row className="form-group">
                <Col sm={4} className="form-label col-form-label">Supplier</Col>
                <Col sm={8} className="form-label col-form-label">
                  {`${supplier.first_name} ${supplier.last_name}, ${supplier.organization}`}{' '}
                </Col>
              </Row>
              <Row>
                <Col sm={4} className="form-label col-form-label">
                  Contact Info
                </Col>
                <Col sm={8} className="form-label col-form-label">
                  {`${supplier.mobile} / ${supplier.email}`}
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
        <Row>
          <Col sm={8}></Col>
          <Col sm={2}>
            <InfoCircle/> {' Go to Supplier Page '}
          </Col>
          <Col sm={2}>
            <Archive/> {' Delete Supply Entry '}
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

      <Container
        className="main-card-container"
        fluid="lg">
        <Card className="main-card">
          <Card.Body>
            <ToolkitProvider
              keyField="id"
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
                                  <Col sm={11}></Col>
                                  <Col sm={1}>
                                    <Dropdown>
                                      {
                                        paginationProps.page !== 1?
                                          <CaretLeftFill onClick={ handlePrevPage(paginationProps) }/> :
                                          <CaretLeft/>
                                      }
                                      <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                                        { `${paginationProps.page} of ${getTotalPages(supplies.length, 5)}` }
                                      </Dropdown.Toggle>
                                      {
                                        paginationProps.page !== getTotalPages(supplies.length, 5)?
                                          <CaretRightFill onClick={ handleNextPage(paginationProps) }/> :
                                          <CaretRight/>
                                      }

                                      <Dropdown.Menu as={CustomMenu}>
                                        <Dropdown.Item
                                          eventKey="0"
                                          onClick={ () => handleSizePerPage(
                                            paginationProps,
                                            5,
                                          ) }
                                          >5</Dropdown.Item>
                                        <Dropdown.Item
                                          eventKey="1"
                                          onClick={ () => handleSizePerPage(
                                            paginationProps,
                                            10,
                                          ) }
                                          >10</Dropdown.Item>
                                        <Dropdown.Item
                                          eventKey="2"
                                          onClick={ () => handleSizePerPage(
                                            paginationProps,
                                            25,
                                          ) }
                                          >25</Dropdown.Item>
                                        <Dropdown.Item
                                          eventKey="3"
                                          onClick={ () => handleSizePerPage(
                                            paginationProps,
                                            50,
                                          ) }
                                          >50</Dropdown.Item>
                                        <Dropdown.Item
                                          eventKey="4"
                                          onClick={ () => handleSizePerPage(
                                            paginationProps,
                                            100,
                                          ) }
                                          >100</Dropdown.Item>
                                        <Dropdown.Item
                                          eventKey="5"
                                          onClick={ () => handleSizePerPage(
                                            paginationProps,
                                            supplies.length,
                                          ) }
                                          >All</Dropdown.Item>
                                      </Dropdown.Menu>
                                    </Dropdown>
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
