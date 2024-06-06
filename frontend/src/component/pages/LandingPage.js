import React from "react";
import Layout from "../Layout/Layout";
import { Link } from "react-router-dom";
const LandingPage = () => {
  return (
    <Layout>
      <div style={{ backgroundColor: "teal", height: "80vh" }}>
        <div className="row">
          <div className="col-md-12 m-5">
            <h2 className="m-5 text-light">RAD TECHNO PVT. LTD</h2>
            <h4 className="m-5 text-light">
              Welocome to Come Booking With your Comfort Zone.....
            </h4>
            <h4 className="m-5 text-light">
              Hotel Booking in Minimum to High Price...
            </h4>
            <h4 className="m-5 text-light">Rooms Avaliable...!</h4>
            <Link to="/home">
              <button className="btn btn-light ml-5 px-5">Get Started</button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LandingPage;
