/* eslint-disable no-undef */
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import {
  Archive,
  Pencil,
  Check,
  InfoCircle,
  CaretLeft,
  CaretLeftFill,
  CaretRight,
  CaretRightFill,
} from "react-bootstrap-icons";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import cellEditFactory, { Type } from "react-bootstrap-table2-editor";
import BootstrapTable from "react-bootstrap-table-next";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import React, { useState, useEffect } from "react";
import Constants from "../constants/SupplyList.js";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";
import sanitizeHtml from "sanitize-html-react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import Card from "react-bootstrap/Card";

import Form from "react-bootstrap/Form";
import "../stylesheets/SupplyList.css";
import { connect } from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PropTypes from "prop-types";
import axios from "axios";

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
  ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
    const [value] = useState("");

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
              !value || child.props.children.toLowerCase().startsWith(value)
          )}
        </ul>
      </div>
    );
  }
);

const TableSearch = (props) => {
  const [searching, setSearching] = useState(false);
  let input;
  const handleClick = () => {
    if (searching) {
      props.onClear();
      input.value = "";
    } else props.onSearch(input.value);
    setSearching(!searching);
  };
  return (
    <Container>
      <Row>
        <Col sm={8}></Col>
        <Col sm={4}>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Enter Supply..."
              ref={(n) => (input = n)}
            />
            <InputGroup.Append>
              <Button onClick={handleClick}>
                {searching ? "Clear" : "Search"}
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Col>
      </Row>
    </Container>
  );
};

async function fetchSupplier(id) {
  try {
    const result = await axios.get(`http://localhost:8000/api/supplier/${id}`);
    const { data, status } = result;
    if (status < 100 || status >= 400)
      throw new Error("Error in fetchSupplier call.");
    return data;
  } catch (e) {
    console.log(e);
    return false;
  }
}

async function fetchSupplies() {
  try {
    const result = await axios.get("http://localhost:8000/api/supply");
    const { data, status } = result;
    if (status < 100 || status >= 400)
      throw new Error("Error in fetchSupplies call.");
    return data;
  } catch (e) {
    console.log(e);
    return false;
  }
}

async function updateSupply(supply) {
  try {
    const result = await axios.put(
      `http://localhost:8000/api/supply/${supply.id}/`,
      supply
    );
    const { data, status } = result;
    if (status < 100 || status >= 400)
      throw new Error("Error in updateSupply call.");
    return data;
  } catch (e) {
    console.log(e);
    return false;
  }
}

async function deleteSupply(id) {
  try {
    const result = await axios.delete(
      `http://localhost:8000/api/supply/${id}/`
    );
    const { data, status } = result;
    if (status < 100 || status >= 400)
      throw new Error("Error in deleteSupply call.");
    return status;
  } catch (e) {
    console.log(e);
    return false;
  }
}

async function validateColumn(newVal, row, col, setSupplies) {
  const { dataField } = col;
  let updatedObj = { ...row };

  switch (dataField) {
    case "name":
      const sanitizedName = sanitizeHtml(
        newVal,
        Constants.SANITIZE_HTML_OPTIONS
      );
      if (sanitizedName.length > Constants.MODEL_VALIDATION.MAX_NAME_ADDRESS) {
        return {
          valid: false,
          message: `Name should not be more than ${Constants.MODEL_VALIDATION.MAX_NAME_ADDRESS} chars.`,
        };
      } else updatedObj["name"] = sanitizedName;
      break;
    case "quantity":
      const integerizedQuantity = parseInt(newVal);
      if (!Number.isInteger(integerizedQuantity)) {
        return {
          valid: false,
          message: `Quantity should be an integer.`,
        };
      }
      updatedObj["quantity"] = integerizedQuantity;
      break;
    case "price":
      if (!Number.isInteger(parseInt(newVal)) || !newVal.includes(".")) {
        return {
          valid: false,
          message: `Price should be a float.`,
        };
      }
      const decimalizedPrice = parseFloat(newVal).toFixed(2);
      updatedObj["price"] = decimalizedPrice;
      break;
    case "unit":
      updatedObj["unit"] = newVal;
      break;
    default:
      updatedObj["region"] = newVal;
  }

  try {
    const update = await updateSupply(updatedObj);
    if (!update) throw new Error("Error in updateSupply call.");

    const supplies = await fetchSupplies();
    if (!supplies) throw new Error("Error in recurringFetch call.");

    setSupplies(supplies);
  } catch (e) {
    console.log(e);
  }
  return true;
}

async function onClickExpandEditButton(
  index,
  supply,
  updatedField,
  fieldsEditableState,
  setFieldsEditableState,
  setSupplies
) {
  if (fieldsEditableState[index]) {
    let updatedObj = { ...supply };
    const sanitized = sanitizeHtml(
      updatedField,
      Constants.SANITIZE_HTML_OPTIONS
    );
    if (index === 0) {
      updatedObj["description"] = sanitized;
    } else if (index === 1) {
      if (sanitized.length > Constants.MODEL_VALIDATION.MAX_NAME_ADDRESS)
        console.log("Handle max address char error here!");
      else updatedObj["address"] = sanitized;
    } else {
      const integerizedQuantity = parseInt(sanitized);
      if (!Number.isInteger(integerizedQuantity))
        console.log("Handle max address char error here!");
      else updatedObj["quantity"] = integerizedQuantity;
    }

    try {
      const update = await updateSupply(updatedObj);
      if (!update) throw new Error("Error in updateSupply call.");

      const supplies = await fetchSupplies();
      if (!supplies) throw new Error("Error in recurringFetch call.");

      setSupplies(supplies);
    } catch (e) {
      console.log(e);
    }
  }
  switch (index) {
    case 0:
      setFieldsEditableState([
        !fieldsEditableState[0],
        fieldsEditableState[1],
        fieldsEditableState[2],
      ]);
      break;
    case 1:
      setFieldsEditableState([
        fieldsEditableState[0],
        !fieldsEditableState[1],
        fieldsEditableState[2],
      ]);
      break;
    default:
      setFieldsEditableState([
        fieldsEditableState[0],
        fieldsEditableState[1],
        !fieldsEditableState[2],
      ]);
  }
}

function SupplyList({ auth }) {
  function onChangeExpandEditFields(event) {
    const { name, value } = event.target;
    if (name === "description") setExpandDescription(value);
    else if (name === "address") setExpandAddress(value);
    else setExpandQuantity(value);
  }
  async function deleteSelected(id) {
    try {
      const deletion = await deleteSupply(id);
      console.log(deletion);
      if (!deletion) throw new Error("Error in deleteSupply call.");

      const supplies = await fetchSupplies();
      if (!supplies) throw new Error("Error in recurringFetch call.");

      setSupplies(supplies);
      handleClose();
    } catch (e) {
      console.log(e);
    }
  }

  const [supplies, setSupplies] = useState([]);
  const [supplier, setSupplier] = useState({});
  const [expandFieldsEditableState, setExpandFieldsEditableState] = useState([
    false,
    false,
  ]);
  const [expandDescription, setExpandDescription] = useState("");
  const [expandAddress, setExpandAddress] = useState("");
  const [expandQuantity, setExpandQuantity] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [getWindowDimensions, setWindowDimensions] = useState({
    height: 0,
    width: 0,
  });

  const handleClose = () => setShowDeleteModal(false);
  const handleShow = () => setShowDeleteModal(true);

  const columns = [
    {
      dataField: "id",
      text: "ID",
      sort: true,
      searchable: false,
    },
    {
      dataField: "name",
      text: "Name",
      validator: (newValue, row, column) =>
        validateColumn(newValue, row, column, setSupplies),
    },
    {
      dataField: "region",
      text: "Region",
      sort: true,
      searchable: false,
      editor: {
        type: Type.SELECT,
        options: Constants.REGIONS,
      },
      filter: textFilter(),
      validator: (newValue, row, column) =>
        validateColumn(newValue, row, column, setSupplies),
    },
    {
      dataField: "quantity",
      text: "Quantity",
      sort: true,
      searchable: false,
      filter: textFilter(),
      validator: (newValue, row, column) =>
        validateColumn(newValue, row, column, setSupplies),
    },
    {
      dataField: "unit",
      text: "Unit",
      searchable: false,
      editor: {
        type: Type.SELECT,
        options: Constants.UNITS,
      },
      validator: (newValue, row, column) =>
        validateColumn(newValue, row, column, setSupplies),
    },
    {
      dataField: "price",
      text: "Price",
      sort: true,
      searchable: false,
      filter: textFilter(),
      validator: (newValue, row, column) =>
        validateColumn(newValue, row, column, setSupplies),
    },
  ];

  const options = {
    custom: true,
    totalSize: supplies.length,
    sizePerPage: 5,
  };

  const getTotalPages = (size, sizePerPage) => Math.ceil(size / sizePerPage);

  const expandRow = {
    onlyOneExpanding: true,
    animate: false,
    showExpandColumn: true,
    expandByColumnOnly: true,
    expandColumnPosition: "right",
    onExpand: async (row, isExpand, rowIndex, e) => {
      const supplier = await fetchSupplier(row.supplier);
      setSupplier(supplier);
      setExpandDescription(row.description);
      setExpandAddress(row.address);
      setExpandQuantity(row.quantity);
    },
    renderer: (row) => (
      <Container>
        {getWindowDimensions.width >= 1200 && (
          <div>
            <Row>
              <Col sm={6}>
                <Form className="row-information">
                  <Form.Group as={Row}>
                    <Form.Label column sm={3}>
                      Description &nbsp;
                      {expandFieldsEditableState[0] ? (
                        <Check
                          fill="#007bff"
                          onClick={() =>
                            onClickExpandEditButton(
                              0,
                              row,
                              expandDescription,
                              expandFieldsEditableState,
                              setExpandFieldsEditableState,
                              setSupplies
                            )
                          }
                        />
                      ) : (
                        <Pencil
                          fill="#007bff"
                          onClick={() =>
                            onClickExpandEditButton(
                              0,
                              row,
                              expandDescription,
                              expandFieldsEditableState,
                              setExpandFieldsEditableState,
                              setSupplies
                            )
                          }
                        />
                      )}
                    </Form.Label>
                    <Col sm={9}>
                      <Form.Control
                        as="textarea"
                        name="description"
                        placeholder="Supply Description"
                        defaultValue={expandDescription}
                        onChange={onChangeExpandEditFields}
                        disabled={!expandFieldsEditableState[0]}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row}>
                    <Form.Label column sm={3}>
                      Address &nbsp;
                      {expandFieldsEditableState[1] ? (
                        <Check
                          fill="#007bff"
                          onClick={() =>
                            onClickExpandEditButton(
                              1,
                              row,
                              expandAddress,
                              expandFieldsEditableState,
                              setExpandFieldsEditableState,
                              setSupplies
                            )
                          }
                        />
                      ) : (
                        <Pencil
                          fill="#007bff"
                          onClick={() =>
                            onClickExpandEditButton(
                              1,
                              row,
                              expandAddress,
                              expandFieldsEditableState,
                              setExpandFieldsEditableState,
                              setSupplies
                            )
                          }
                        />
                      )}
                    </Form.Label>
                    <Col sm={9}>
                      <Form.Control
                        placeholder="Supply Address"
                        name="address"
                        defaultValue={expandAddress}
                        onChange={onChangeExpandEditFields}
                        disabled={!expandFieldsEditableState[1]}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row}>
                    <Form.Label column sm={3}>
                      Quantity &nbsp;
                      {expandFieldsEditableState[2] ? (
                        <Check
                          fill="#007bff"
                          onClick={() =>
                            onClickExpandEditButton(
                              2,
                              row,
                              expandQuantity,
                              expandFieldsEditableState,
                              setExpandFieldsEditableState,
                              setSupplies
                            )
                          }
                        />
                      ) : (
                        <Pencil
                          fill="#007bff"
                          onClick={() =>
                            onClickExpandEditButton(
                              2,
                              row,
                              expandQuantity,
                              expandFieldsEditableState,
                              setExpandFieldsEditableState,
                              setSupplies
                            )
                          }
                        />
                      )}
                    </Form.Label>
                    <Col sm={9}>
                      <Form.Control
                        placeholder="Supply Quantity"
                        name="quantity"
                        defaultValue={expandQuantity}
                        onChange={onChangeExpandEditFields}
                        disabled={!expandFieldsEditableState[2]}
                      />
                    </Col>
                  </Form.Group>
                </Form>
              </Col>
              <Col sm={6}>
                <Container className="row-information">
                  <Row className="form-group">
                    <Col sm={3} className="form-label col-form-label">
                      Supplier
                    </Col>
                    <Col sm={9} className="form-label col-form-label">
                      {`${supplier.first_name} ${supplier.last_name}, ${supplier.organization}`}{" "}
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={3} className="form-label col-form-label">
                      Contact Info
                    </Col>
                    <Col sm={9} className="form-label col-form-label">
                      {`${supplier.mobile} / ${supplier.email}`}
                    </Col>
                  </Row>
                </Container>
              </Col>
            </Row>
            <Row>
              <Col sm={8}></Col>
              <Col sm={2}>
                {/* <InfoCircle fill="#17a2b8" />
                &nbsp;{"Go to Supplier Page"} */}
              </Col>
              <Col sm={2}>
                <a
                  href="javascript:;"
                  className="a-delete"
                  onClick={() => handleShow()}
                >
                  <Archive fill="#dc3545" /> {" Delete Supply Entry "}
                </a>
              </Col>
            </Row>
          </div>
        )}
        {getWindowDimensions.width < 1200 && getWindowDimensions.width >= 990 && (
          <div>
            <Row>
              <Col sm>
                <Form className="row-information">
                  <Form.Group as={Row}>
                    <Form.Label column sm={3}>
                      Description &nbsp;
                      {expandFieldsEditableState[0] ? (
                        <Check
                          fill="#007bff"
                          onClick={() =>
                            onClickExpandEditButton(
                              0,
                              row,
                              expandDescription,
                              expandFieldsEditableState,
                              setExpandFieldsEditableState,
                              setSupplies
                            )
                          }
                        />
                      ) : (
                        <Pencil
                          fill="#007bff"
                          onClick={() =>
                            onClickExpandEditButton(
                              0,
                              row,
                              expandDescription,
                              expandFieldsEditableState,
                              setExpandFieldsEditableState,
                              setSupplies
                            )
                          }
                        />
                      )}
                    </Form.Label>
                    <Col sm={9}>
                      <Form.Control
                        as="textarea"
                        name="description"
                        placeholder="Supply Description"
                        defaultValue={expandDescription}
                        onChange={onChangeExpandEditFields}
                        disabled={!expandFieldsEditableState[0]}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row}>
                    <Form.Label column sm={3}>
                      Address &nbsp;
                      {expandFieldsEditableState[1] ? (
                        <Check
                          fill="#007bff"
                          onClick={() =>
                            onClickExpandEditButton(
                              1,
                              row,
                              expandAddress,
                              expandFieldsEditableState,
                              setExpandFieldsEditableState,
                              setSupplies
                            )
                          }
                        />
                      ) : (
                        <Pencil
                          fill="#007bff"
                          onClick={() =>
                            onClickExpandEditButton(
                              1,
                              row,
                              expandAddress,
                              expandFieldsEditableState,
                              setExpandFieldsEditableState,
                              setSupplies
                            )
                          }
                        />
                      )}
                    </Form.Label>
                    <Col sm={9}>
                      <Form.Control
                        placeholder="Supply Address"
                        name="address"
                        defaultValue={expandAddress}
                        onChange={onChangeExpandEditFields}
                        disabled={!expandFieldsEditableState[1]}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row}>
                    <Form.Label column sm={3}>
                      Quantity &nbsp;
                      {expandFieldsEditableState[2] ? (
                        <Check
                          fill="#007bff"
                          onClick={() =>
                            onClickExpandEditButton(
                              2,
                              row,
                              expandQuantity,
                              expandFieldsEditableState,
                              setExpandFieldsEditableState,
                              setSupplies
                            )
                          }
                        />
                      ) : (
                        <Pencil
                          fill="#007bff"
                          onClick={() =>
                            onClickExpandEditButton(
                              2,
                              row,
                              expandQuantity,
                              expandFieldsEditableState,
                              setExpandFieldsEditableState,
                              setSupplies
                            )
                          }
                        />
                      )}
                    </Form.Label>
                    <Col sm={9}>
                      <Form.Control
                        placeholder="Supply Quantity"
                        name="quantity"
                        defaultValue={expandQuantity}
                        onChange={onChangeExpandEditFields}
                        disabled={!expandFieldsEditableState[2]}
                      />
                    </Col>
                  </Form.Group>
                </Form>
              </Col>
            </Row>
            <Row>
              <Col sm>
                <Container className="row-information">
                  <Row className="form-group">
                    <Col sm={3} className="form-label col-form-label">
                      Supplier
                    </Col>
                    <Col sm={9} className="form-label col-form-label">
                      {`${supplier.first_name} ${supplier.last_name}, ${supplier.organization}`}{" "}
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={3} className="form-label col-form-label">
                      Contact Info
                    </Col>
                    <Col sm={9} className="form-label col-form-label">
                      {`${supplier.mobile} / ${supplier.email}`}
                    </Col>
                  </Row>
                </Container>
              </Col>
            </Row>
            <Row>
              <Col sm={6} className="justify-content-sm-center">
                <InfoCircle fill="#17a2b8" />
                &nbsp;{"Go to Supplier Page"}
              </Col>
              <Col sm={6} className="justify-content-sm-center">
                <a
                  href="javascript:;"
                  className="a-delete"
                  onClick={() => handleShow()}
                >
                  <Archive fill="#dc3545" /> {" Delete Supply Entry "}
                </a>
              </Col>
            </Row>
          </div>
        )}
        {getWindowDimensions.width < 990 && getWindowDimensions.width >= 575 && (
          <div>
            <Row>
              <Col sm>
                <Form className="row-information">
                  <Form.Group as={Row}>
                    <Form.Label column sm={3}>
                      Description &nbsp;
                      {expandFieldsEditableState[0] ? (
                        <Check
                          fill="#007bff"
                          onClick={() =>
                            onClickExpandEditButton(
                              0,
                              row,
                              expandDescription,
                              expandFieldsEditableState,
                              setExpandFieldsEditableState,
                              setSupplies
                            )
                          }
                        />
                      ) : (
                        <Pencil
                          fill="#007bff"
                          onClick={() =>
                            onClickExpandEditButton(
                              0,
                              row,
                              expandDescription,
                              expandFieldsEditableState,
                              setExpandFieldsEditableState,
                              setSupplies
                            )
                          }
                        />
                      )}
                    </Form.Label>
                    <Col sm={9}>
                      <Form.Control
                        as="textarea"
                        name="description"
                        placeholder="Supply Description"
                        defaultValue={expandDescription}
                        onChange={onChangeExpandEditFields}
                        disabled={!expandFieldsEditableState[0]}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row}>
                    <Form.Label column sm={3}>
                      Address &nbsp;
                      {expandFieldsEditableState[1] ? (
                        <Check
                          fill="#007bff"
                          onClick={() =>
                            onClickExpandEditButton(
                              1,
                              row,
                              expandAddress,
                              expandFieldsEditableState,
                              setExpandFieldsEditableState,
                              setSupplies
                            )
                          }
                        />
                      ) : (
                        <Pencil
                          fill="#007bff"
                          onClick={() =>
                            onClickExpandEditButton(
                              1,
                              row,
                              expandAddress,
                              expandFieldsEditableState,
                              setExpandFieldsEditableState,
                              setSupplies
                            )
                          }
                        />
                      )}
                    </Form.Label>
                    <Col sm={9}>
                      <Form.Control
                        placeholder="Supply Address"
                        name="address"
                        defaultValue={expandAddress}
                        onChange={onChangeExpandEditFields}
                        disabled={!expandFieldsEditableState[1]}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row}>
                    <Form.Label column sm={3}>
                      Quantity &nbsp;
                      {expandFieldsEditableState[2] ? (
                        <Check
                          fill="#007bff"
                          onClick={() =>
                            onClickExpandEditButton(
                              2,
                              row,
                              expandQuantity,
                              expandFieldsEditableState,
                              setExpandFieldsEditableState,
                              setSupplies
                            )
                          }
                        />
                      ) : (
                        <Pencil
                          fill="#007bff"
                          onClick={() =>
                            onClickExpandEditButton(
                              2,
                              row,
                              expandQuantity,
                              expandFieldsEditableState,
                              setExpandFieldsEditableState,
                              setSupplies
                            )
                          }
                        />
                      )}
                    </Form.Label>
                    <Col sm={9}>
                      <Form.Control
                        placeholder="Supply Quantity"
                        name="quantity"
                        defaultValue={expandQuantity}
                        onChange={onChangeExpandEditFields}
                        disabled={!expandFieldsEditableState[2]}
                      />
                    </Col>
                  </Form.Group>
                </Form>
              </Col>
            </Row>
            <Row>
              <Col sm>
                <Container className="row-information">
                  <Row className="form-group">
                    <Col sm={3} className="form-label col-form-label">
                      Supplier
                    </Col>
                    <Col sm={9} className="form-label col-form-label">
                      {`${supplier.first_name} ${supplier.last_name}, ${supplier.organization}`}{" "}
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={3} className="form-label col-form-label">
                      Contact Info
                    </Col>
                    <Col sm={9} className="form-label col-form-label">
                      {`${supplier.mobile} / ${supplier.email}`}
                    </Col>
                  </Row>
                </Container>
              </Col>
            </Row>
            <Row>
              <Col sm={6} className="text-align-right">
                <InfoCircle fill="#17a2b8" />
                &nbsp;{"Go to Supplier Page"}
              </Col>
              <Col sm={6}>
                <a
                  href="javascript:;"
                  className="a-delete"
                  onClick={() => handleShow()}
                >
                  <Archive fill="#dc3545" /> {" Delete Supply Entry "}
                </a>
              </Col>
            </Row>
          </div>
        )}
        {getWindowDimensions.width < 575 && (
          <div>
            <Row>
              <Col sm={6}>
                <Form className="row-information">
                  <Form.Group as={Row}>
                    <Form.Label column sm={3}>
                      Description &nbsp;
                      {expandFieldsEditableState[0] ? (
                        <Check
                          fill="#007bff"
                          onClick={() =>
                            onClickExpandEditButton(
                              0,
                              row,
                              expandDescription,
                              expandFieldsEditableState,
                              setExpandFieldsEditableState,
                              setSupplies
                            )
                          }
                        />
                      ) : (
                        <Pencil
                          fill="#007bff"
                          onClick={() =>
                            onClickExpandEditButton(
                              0,
                              row,
                              expandDescription,
                              expandFieldsEditableState,
                              setExpandFieldsEditableState,
                              setSupplies
                            )
                          }
                        />
                      )}
                    </Form.Label>
                    <Col sm={9}>
                      <Form.Control
                        as="textarea"
                        name="description"
                        placeholder="Supply Description"
                        defaultValue={expandDescription}
                        onChange={onChangeExpandEditFields}
                        disabled={!expandFieldsEditableState[0]}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row}>
                    <Form.Label column sm={3}>
                      Address &nbsp;
                      {expandFieldsEditableState[1] ? (
                        <Check
                          fill="#007bff"
                          onClick={() =>
                            onClickExpandEditButton(
                              1,
                              row,
                              expandAddress,
                              expandFieldsEditableState,
                              setExpandFieldsEditableState,
                              setSupplies
                            )
                          }
                        />
                      ) : (
                        <Pencil
                          fill="#007bff"
                          onClick={() =>
                            onClickExpandEditButton(
                              1,
                              row,
                              expandAddress,
                              expandFieldsEditableState,
                              setExpandFieldsEditableState,
                              setSupplies
                            )
                          }
                        />
                      )}
                    </Form.Label>
                    <Col sm={9}>
                      <Form.Control
                        placeholder="Supply Address"
                        name="address"
                        defaultValue={expandAddress}
                        onChange={onChangeExpandEditFields}
                        disabled={!expandFieldsEditableState[1]}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row}>
                    <Form.Label column sm={3}>
                      Quantity &nbsp;
                      {expandFieldsEditableState[2] ? (
                        <Check
                          fill="#007bff"
                          onClick={() =>
                            onClickExpandEditButton(
                              2,
                              row,
                              expandQuantity,
                              expandFieldsEditableState,
                              setExpandFieldsEditableState,
                              setSupplies
                            )
                          }
                        />
                      ) : (
                        <Pencil
                          fill="#007bff"
                          onClick={() =>
                            onClickExpandEditButton(
                              2,
                              row,
                              expandQuantity,
                              expandFieldsEditableState,
                              setExpandFieldsEditableState,
                              setSupplies
                            )
                          }
                        />
                      )}
                    </Form.Label>
                    <Col sm={9}>
                      <Form.Control
                        placeholder="Supply Quantity"
                        name="quantity"
                        defaultValue={expandQuantity}
                        onChange={onChangeExpandEditFields}
                        disabled={!expandFieldsEditableState[2]}
                      />
                    </Col>
                  </Form.Group>
                </Form>
              </Col>
              <Col sm={6}>
                <Container className="row-information">
                  <Row className="form-group">
                    <Col sm={3} className="form-label col-form-label">
                      Supplier
                    </Col>
                    <Col sm={9} className="form-label col-form-label">
                      {`${supplier.first_name} ${supplier.last_name}, ${supplier.organization}`}{" "}
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={3} className="form-label col-form-label">
                      Contact Info
                    </Col>
                    <Col sm={9} className="form-label col-form-label">
                      {`${supplier.mobile} / ${supplier.email}`}
                    </Col>
                  </Row>
                </Container>
              </Col>
            </Row>
            <Row>
              <Col className="text-align-center" sm>
                <InfoCircle fill="#17a2b8" />
                &nbsp;{"Go to Supplier Page"}
                &nbsp;
                <a
                  href="javascript:;"
                  className="a-delete"
                  onClick={() => handleShow()}
                >
                  <Archive fill="#dc3545" /> {" Delete Supply Entry "}
                </a>
              </Col>
            </Row>
          </div>
        )}

        <Modal
          size="lg"
          dialogClassName="modal-delete"
          show={showDeleteModal}
          onHide={handleClose}
          animation={false}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>{`Deleting entry: ${row.name}`}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {"Are you sure you want to delete "}
            <i>{row.name}&nbsp;</i>
            {" from the supply list?"}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="danger" onClick={() => deleteSelected(row.id)}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    ),
  };

  const handleNextPage = ({ page, onPageChange }) => () => {
    const resultingPage = page + 1;
    if (resultingPage <= getTotalPages(supplies.length, 5))
      onPageChange(resultingPage);
  };

  const handlePrevPage = ({ page, onPageChange }) => () => {
    const resultingPage = page - 1;
    if (resultingPage > 0) onPageChange(resultingPage);
  };

  const handleSizePerPage = ({ page, onSizePerPageChange }, newSizePerPage) => {
    onSizePerPageChange(newSizePerPage, page);
  };

  const updateDimensions = () => {
    let height = typeof window !== "undefined" ? window.innerHeight : 0;
    let width = typeof window !== "undefined" ? window.innerWidth : 0;

    setWindowDimensions({
      height,
      width,
    });
  };

  useEffect(() => {
    async function initialFetch() {
      try {
        const supplies = await fetchSupplies();
        if (!supplies) throw new Error("Error in initialFetch call.");
        setSupplies(supplies);
      } catch (e) {
        console.log(e);
      }
    }
    initialFetch();
    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  return (
    <div className="SupplyList">
      <div>
        <Jumbotron className="jumbo-header">
          <div class="container jumbo-description">
            <p className="jumbo-title">SUPPLY LIST</p>
            <p className="jumbo-instructions">
              Filter supplies based on region, quantity, and price.
            </p>
          </div>
        </Jumbotron>
      </div>

      <Container className="main-card-container" fluid="lg">
        <Card className="main-card">
          <Card.Body>
            <ToolkitProvider
              keyField="id"
              data={supplies}
              columns={columns}
              search
            >
              {(props) => (
                <div>
                  <TableSearch {...props.searchProps} />
                  <PaginationProvider pagination={paginationFactory(options)}>
                    {({ paginationProps, paginationTableProps }) => (
                      <Container>
                        <Row>
                          <Col sm={12}>
                            <BootstrapTable
                              {...props.baseProps}
                              bordered={false}
                              filter={filterFactory()}
                              expandRow={expandRow}
                              bootstrap4
                              filterPosition="bottom"
                              cellEdit={cellEditFactory({
                                mode: "click",
                                blurToSave: true,
                                autoSelectText: true,
                              })}
                              {...paginationTableProps}
                            />
                          </Col>
                          <Col sm={11}></Col>
                          <Col sm={1}>
                            <Dropdown>
                              {paginationProps.page !== 1 ? (
                                <CaretLeftFill
                                  onClick={handlePrevPage(paginationProps)}
                                />
                              ) : (
                                <CaretLeft />
                              )}
                              <Dropdown.Toggle
                                as={CustomToggle}
                                id="dropdown-custom-components"
                              >
                                {`${paginationProps.page} of ${getTotalPages(
                                  supplies.length,
                                  5
                                )}`}
                              </Dropdown.Toggle>
                              {paginationProps.page !==
                              getTotalPages(supplies.length, 5) ? (
                                <CaretRightFill
                                  onClick={handleNextPage(paginationProps)}
                                />
                              ) : (
                                <CaretRight />
                              )}

                              <Dropdown.Menu as={CustomMenu}>
                                <Dropdown.Item
                                  eventKey="0"
                                  onClick={() =>
                                    handleSizePerPage(paginationProps, 5)
                                  }
                                >
                                  5
                                </Dropdown.Item>
                                <Dropdown.Item
                                  eventKey="1"
                                  onClick={() =>
                                    handleSizePerPage(paginationProps, 10)
                                  }
                                >
                                  10
                                </Dropdown.Item>
                                <Dropdown.Item
                                  eventKey="2"
                                  onClick={() =>
                                    handleSizePerPage(paginationProps, 25)
                                  }
                                >
                                  25
                                </Dropdown.Item>
                                <Dropdown.Item
                                  eventKey="3"
                                  onClick={() =>
                                    handleSizePerPage(paginationProps, 50)
                                  }
                                >
                                  50
                                </Dropdown.Item>
                                <Dropdown.Item
                                  eventKey="4"
                                  onClick={() =>
                                    handleSizePerPage(paginationProps, 100)
                                  }
                                >
                                  100
                                </Dropdown.Item>
                                <Dropdown.Item
                                  eventKey="5"
                                  onClick={() =>
                                    handleSizePerPage(
                                      paginationProps,
                                      supplies.length
                                    )
                                  }
                                >
                                  All
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </Col>
                        </Row>
                      </Container>
                    )}
                  </PaginationProvider>
                </div>
              )}
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
