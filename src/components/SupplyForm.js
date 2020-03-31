import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import '../stylesheets/formStyle.css';
const SupplyForm= ({ setForm, formData, navigation })=>{
    const {previous, next} = navigation;
    return(
        <div className="container">
            <Form>
                <h3>Supply Information</h3>
                <Form.Group>
                    <Form.Control type="text" placeholder="Item Name" />
                </Form.Group>
                <Form.Group>
                    <Form.Control type="text" placeholder="Address" />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Amount and Price</Form.Label>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-6 row">
                                <Form.Control className="col-sm-6" type="number" placeholder="Amount" /> 
                                <Form.Control className="col-sm-3" as="select" value="volume">
                                    <option>g</option>
                                    <option>kg</option>
                                    <option>item</option>
                                </Form.Control>
                            </div>
                            <div className="col-sm-6">
                                <Form.Control type="number" placeholder="Price" />
                                <Form.Text className="text-muted">
                                    Answer price per unit.
                                </Form.Text>
                            </div>
                        </div>
                    </div>
                    
                    
                </Form.Group>
                <Form.Group>
                    <Button type="submit" variant="primary">Add Item</Button>
                </Form.Group>
            </Form>
        <div className="container">
            <div className="row">
                <div className="col-md">
                    <Button onClick={previous} variant="info">
                    <svg class="bi bi-arrow-left" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" d="M5.854 4.646a.5.5 0 010 .708L3.207 8l2.647 2.646a.5.5 0 01-.708.708l-3-3a.5.5 0 010-.708l3-3a.5.5 0 01.708 0z" clip-rule="evenodd"/>
  <path fill-rule="evenodd" d="M2.5 8a.5.5 0 01.5-.5h10.5a.5.5 0 010 1H3a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>
</svg>
                        Previous</Button>
                </div>
                <div className="col-md">
                    <Button onClick={next} variant="info">Next
                    <svg class="bi bi-arrow-right" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" d="M10.146 4.646a.5.5 0 01.708 0l3 3a.5.5 0 010 .708l-3 3a.5.5 0 01-.708-.708L12.793 8l-2.647-2.646a.5.5 0 010-.708z" clip-rule="evenodd"/>
  <path fill-rule="evenodd" d="M2 8a.5.5 0 01.5-.5H13a.5.5 0 010 1H2.5A.5.5 0 012 8z" clip-rule="evenodd"/>
</svg></Button>
                </div>
            </div>
        </div>
        </div>
    );
}

export default SupplyForm;