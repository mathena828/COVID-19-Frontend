import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
// import InputGroup from "react-bootstrap/InputGroup";
// import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

import "../stylesheets/Landing.css";

export default function Landing() {
  return (
    <div className="Landing">
      <header>

        <div className="header-content">
          <h1>
            <strong>Agricultural Resources At Your Fingertips</strong>
          </h1>
          <h4>Let's #ENDCOV</h4>
          <Link to="/register">
            <Button>Register as an LGU</Button>{" "}
          </Link>
          <strong>or</strong>
          <Link to="/add-supply">
            <Button>Post my available supplies</Button>
          </Link>
        </div>
      </header>
      <main>
        <div className="main-content main1 container">
          <h3>
            What is <strong>AgriLink</strong>?
          </h3>
          <p>
            AgriLink is a free-to-use site to help with the delivery of supplies our
            Local Government Units (LGU) so they can sort through all the
            resources and divde them fairly to their respective communities.
          </p>
        </div>
        <div className="main-content main2 container">
          <h3>LGU Representatives vs Suppliers</h3>
          <hr/>
          <div className="row">
            <div className="col-sm">
              LGU representatives are the ones in charge of getting supplies
              from drop points dictated by Suppliers. They have an access to a
              database of goods that can be delivered, and bringing them to
              their respective communities.
            </div>
            <div className="col-sm">
              Suppliers are the ones who will deliver goods to the LGUs, making
              sure that every good they deliver makes to the drop point safely.
              If any supplier wants to contribute, they will be connected with
              the LGU representatives via their email or phone number.
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
