import React from "react";
import Button from "react-bootstrap/Button";
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
          <strong>OR</strong>
          <Link to="/add-supply">
            <Button>Post my Available Supplies</Button>
          </Link>
        </div>
      </header>
      <main>
        <div className="main-content main1 container mt-4">
          <h3>
            What is <strong>AgriLink</strong>?
          </h3>
          <p className="text-justify">
            AgriLink is a free-to-use website that helps suppliers connect to
            Local Government Units (LGU). It is that inventory management
            platform that allows LGUs to discover and allocate resources to
            their respective communities.
          </p>
        </div>
        <div className="main-content main2 container mb-4">
          <h3>Local Government Units (LGU) & Suppliers</h3>
          <hr />
          <div className="row">
            <div className="col-sm text-justify">
              LGU representatives are the ones in charge of getting supplies
              from drop points dictated by the suppliers. They have access to a
              database of goods that can be delivered to certain locales. They
              can also sort and filter resources based on several metric such as
              price, quantity, and location.
            </div>
            <div className="col-sm text-justify">
              Suppliers are the ones who will deliver the goods to the LGUs,
              ensuring that every product they deliver makes it to the drop
              point safely. If any supplier wants to contribute, they will be
              connected with the LGU representatives via their email or phone
              number.
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
