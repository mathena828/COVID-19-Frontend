import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Modal from 'react-bootstrap/Modal';

import '../stylesheets/formStyle.css';

var indexCount=0;
const SupplyForm= ({ orgName, firstName,lastName, email,phone,supplies, setSupplies, navigation, handleSubmit })=>{
    const [formRegion, setRegion] = useState('');
    const [unit, setUnit] = useState('');
    const [formName, setFormName] = useState('');
    const [formAddress, setFormAddress] = useState('');
    const [formAmount, setFormAmount] = useState(1);
    const [formPrice, setFormPrice] = useState(0.00);
    const [formDescription, setFormDescription] = useState('');

    const {previous, next} = navigation;
    
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    var supplyList=supplies.map((supply)=>{
        var totalPrice = supply.price * supply.amount;
        return(
            <Card key={supply.index}>
                
                <Card.Body>
                    <Card.Title>Item Name: {supply.name} 
                    <div style={{textAlign:"right"}}>
                        <Button onClick={()=>deleteSupply(supply.index)} variant = "outline-danger">
                        <svg className="bi bi-trash" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.5 5.5A.5.5 0 016 6v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm2.5 0a.5.5 0 01.5.5v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm3 .5a.5.5 0 00-1 0v6a.5.5 0 001 0V6z"/>
                        <path fillRule="evenodd" d="M14.5 3a1 1 0 01-1 1H13v9a2 2 0 01-2 2H5a2 2 0 01-2-2V4h-.5a1 1 0 01-1-1V2a1 1 0 011-1H6a1 1 0 011-1h2a1 1 0 011 1h3.5a1 1 0 011 1v1zM4.118 4L4 4.059V13a1 1 0 001 1h6a1 1 0 001-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" clipRule="evenodd"/>
                        </svg>
                        </Button>
                    </div>
                    </Card.Title>
                    <Card.Subtitle>Address: {supply.address}</Card.Subtitle>
                    <hr/>
                    <p>Description</p>
                    <p className="supply-description">{supply.description}</p>
                    <Card.Subtitle>{supply.amount} for Php{totalPrice}</Card.Subtitle>
                </Card.Body>
            </Card>
        );
    });
    function saveSupply(name, address, region,amount,price,description){
        var newSupply= {
            name:name,
            address:address,
            amount:amount,
            region:region,
            price:price,
            description:description,
            index:indexCount
        }
        indexCount+=1;
        setSupplies([...supplies, newSupply]);
    }

    function deleteSupply(supplyIndex){
        const newSupplies = supplies.filter((_,index)=> index!=supplyIndex);

        setSupplies(newSupplies);
    }

    return(

        <div className="SupplyForm">
        <div>
                <Jumbotron>
                <Link to="/"><Button variant="outline-secondary">Back to Home</Button></Link>
                   <h3>Hi, thank you for registering your produce to the site.
                       Just answer this form and we'll be good to go!</h3> 
                </Jumbotron>
        </div>
        <div className="container">
            <Form onSubmit={(e)=>{handleSubmit(orgName, firstName,lastName, email,phone,supplies)}}>
                <h3>Supply Information</h3>
                <Form.Group className="container row">
                    <Form.Control 
                    value={formName}
                    onChange={e=>setFormName(e.target.value)}
                    type="text" 
                    className="col-sm-5"
                    placeholder="Item Name" />
                </Form.Group>
                <Form.Group>
                    <div className="container">
                        <div className="row">
                            <Form.Control 
                            value={formAddress}
                            onChange={e=>setFormAddress(e.target.value)}
                            type="text" placeholder="Address" 
                            className="col-sm-7"/>
                            <Form.Control 
                            value={formRegion}
                            as="select"
                            onChange={e=>setRegion(e.target.value)}
                            className="col-sm">
                                <option>NCR - National Capital Region</option>
                                <option>Region I - Ilocos Region</option>
                                <option>Region II - Cagayan Valley</option>
                                <option>CAR - Cordillera Administrative Region</option>
                                <option>Region III - Central Luzon</option>
                                <option>Region IV-A - Calabarzon</option>
                                <option>Mimaropa - Southwestern Tagalog Region</option>
                                <option>Region V - Bicol Region</option>
                                <option>Region VI - Western Visayas</option>
                                <option>Region VII - Central Visayas</option>
                                <option>Region VIII - Eastern Visayas</option>
                                <option>Region IX - Zamboanga Peninsula</option>
                                <option>Region X - Northern Mindanao</option>
                                <option>Region XI - Davao Region</option>
                                <option>Region XII - Soccskargen</option>
                                <option>Region XIII - Caraga Region</option>
                                <option>BARMM - Bangsamoro Autonomous Region in Muslim Mindanao</option>
                            </Form.Control>
                        </div>
                    </div>
                   
                    <Form.Text className="text-muted">
                        Where will this item be available for pickup.
                    </Form.Text>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Amount and Price</Form.Label>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-6">
                                <Form.Control 
                                value={formAmount}
                                onChange={e=>setFormAmount(e.target.value)}
                                className="col-sm-4" type="number" placeholder="Amount" /> 
                                <Form.Control className="col-sm-4" as="select" value={unit} onChange={e=>setUnit(e.target.value)}>
                                    <option>g</option>
                                    <option>kg</option>
                                    <option>mL</option>
                                    <option>liter</option>
                                    <option>meter</option>
                                    <option>item</option>
                                </Form.Control>
                            </div>
                            <div className="col-sm-6">

                                <Form.Control type="number" placeholder="Price in Php" /> 
                                <Form.Text 
                                value={formPrice}
                                onChange={e=>setFormPrice(e.target.value)}
                                className="text-muted">
                                    Answer price per unit.
                                </Form.Text>
                            </div>
                        </div>
                    </div>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control 
                    placeholder="Place your description here"
                    value={formDescription}
                    onChange={e=>setFormDescription(e.target.value)}
                    as="textarea" rows="3" />
                </Form.Group>
                    <Button onClick={e=> saveSupply(formName, formAddress,formRegion, formAmount,formPrice,formDescription, )}variant="primary">Add Item</Button>
                    <Button type="submit" variant="danger">SUBMIT</Button>
            </Form>
        
        {supplyList}
        <div className="container">
            <div className="row">
                <div className="col-md" style ={{textAlign:"left"}}>
                    <Button onClick={previous} variant="info">
                    <svg className="bi bi-arrow-left" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M5.854 4.646a.5.5 0 010 .708L3.207 8l2.647 2.646a.5.5 0 01-.708.708l-3-3a.5.5 0 010-.708l3-3a.5.5 0 01.708 0z" clipRule="evenodd"/>
                    <path fillRule="evenodd" d="M2.5 8a.5.5 0 01.5-.5h10.5a.5.5 0 010 1H3a.5.5 0 01-.5-.5z" clipRule="evenodd"/>
                    </svg>
                        Previous</Button>
                </div>
            </div>
        </div>
        </div>

        <Modal show={show} onHide={handleClose}>
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
      </Modal>

        </div>
    );
}

export default SupplyForm;