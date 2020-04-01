import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import '../stylesheets/formStyle.css';

const SupplyForm= ({ setForm, formData, navigation })=>{
    const {previous, next} = navigation;
    const [unit, setUnit] = useState('');
    const [formName, setFormName] = useState('');
    const [formAddress, setFormAddress] = useState('');
    const [formAmount, setFormAmount] = useState(1);
    const [formPrice, setFormPrice] = useState(0.00);
    const [formDescription, setFormDescription] = useState('');
    const [supplies, setSupplies, deleteSupplies] = useState([]);

    var supplyList=supplies.map((supply)=>{
        var totalPrice = supply.price * supply.amount;
        return(
            <Card key={supply.name}>
                
                <Card.Body>
                    <Card.Title>{supply.name} 
                    <div style={{textAlign:"right"}}>
                        <Button variant = "outline-danger">
                        <svg class="bi bi-trash" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.5 5.5A.5.5 0 016 6v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm2.5 0a.5.5 0 01.5.5v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm3 .5a.5.5 0 00-1 0v6a.5.5 0 001 0V6z"/>
                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 01-1 1H13v9a2 2 0 01-2 2H5a2 2 0 01-2-2V4h-.5a1 1 0 01-1-1V2a1 1 0 011-1H6a1 1 0 011-1h2a1 1 0 011 1h3.5a1 1 0 011 1v1zM4.118 4L4 4.059V13a1 1 0 001 1h6a1 1 0 001-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" clip-rule="evenodd"/>
                        </svg>
                        </Button>
                    </div>
                    </Card.Title>
                    <Card.Subtitle>{supply.address}</Card.Subtitle>
                    <hr/>
                    <p>{supply.description}</p>
                    <Card.Subtitle>{supply.amount} for Php{totalPrice}</Card.Subtitle>
                </Card.Body>
            </Card>
        );
    });
    function saveSupply(name, address,amount,price,description){
        var newSupply= {
            name:name,
            address:address,
            amount:amount,
            
            price:price,
            description:description
        }
        setSupplies([...supplies, newSupply]);
    }

    return(
        <div className="container">
            <Form onSubmit={(e)=>{
                e.preventDefault(); 
                saveSupply(formName, formAddress, formAmount, formPrice, formDescription);
                e.target.reset();
            }}>
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
                    <Form.Control 
                    value={formAddress}
                    onChange={e=>setFormAddress(e.target.value)}
                    type="text" placeholder="Address" />
                    <Form.Text className="text-muted">
                        Where will this item be available for pickup.
                    </Form.Text>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Amount and Price</Form.Label>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-6 row">
                                <Form.Control 
                                value={formAmount}
                                onChange={e=>setFormAmount(e.target.value)}
                                className="col-sm-6" type="number" placeholder="Amount" /> 
                                <Form.Control className="col-sm-4" as="select" value={unit} onChange={e=>setUnit(e.target.value)}>
                                    <option>g</option>
                                    <option>kg</option>
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
                    value={formDescription}
                    onChange={e=>setFormDescription(e.target.value)}
                    as="textarea" rows="3" />
                </Form.Group>
                <Form.Group>
                    <Button type="submit" variant="primary">Add Item</Button>
                </Form.Group>
            </Form>
        
        {supplyList}
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
                <div className="col-md" style ={{textAlign:"right"}}>
                    <Button onClick={next} variant="info" >Next
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