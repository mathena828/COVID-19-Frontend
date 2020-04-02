import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';

import { Link } from 'react-router-dom';

import '../stylesheets/Landing.css';
export default function Landing(){
    return(
        <div className="Landing">
            
            <header>
                <div className="header-content">
                    <h1><strong>Agricultural Resources At Your Fingertips</strong></h1>
                    <h4>Let's #ENDCOV</h4>
                    <p>I am a...</p>
                    
                    <Link to="/login"><Button>LGU Representative</Button> </Link>
                    
                    <Link to="/add-supply"><Button>Supplier</Button></Link>
                </div>
            </header>
            <main> 
                <h3>Who are we?</h3>
            </main>
        </div>
    );

}