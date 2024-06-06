import React, { useState } from "react";
import "../../App.css";
import Layout from "../Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Loaderr from "../Common/Loaderr";
import Error from "../Common/Error";
import Success from "../Common/Success";

const Register = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/auth/register", {
        name,
        email,
        phone,
        address,
        password,
        isAdmin,
      });

      console.log(data);
      if (data && data.success) {
        toast(data.message);

        navigate("/login");
      } else {
        toast(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="containerFromLoginAndRegsiter">
        <form className="form">
          <h1 className="text-center">Register</h1>
          <div className="form-group">
            <input
              type="text"
              className="form-control-register"
              id="name"
              name={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter a Name"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control-register"
              id="address"
              name={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter a Address"
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control-register"
              id="email"
              name={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter a email"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control-register"
              id="password"
              name={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter a Password"
            />
          </div>
          <div className="form-group">
            <input
              type="phone"
              className="form-control-register"
              id="phone"
              name={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter a Phone"
            />
          </div>
          <div className="form-group">
            <select
              className="custom-select my-1 mr-sm-2"
              id="inlineFormCustomSelectPref"
              value={isAdmin} // This ensures that the selected value reflects the state
              onChange={(e) => setIsAdmin(e.target.value === "true")}>
              <option value="true">true</option>
              <option value="false">false</option>
            </select>
          </div>

          <button
            type="submit"
            className="registerBtn btn btn-dark"
            onClick={handleSubmit}>
            REGISTER
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
