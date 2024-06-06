import React, { useState } from "react";
import Layout from "../Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loaderr from "../Common/Loaderr";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState();
  // const [success, setSuccess] = useState();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });
      // setLoading(false);
      // setSuccess(true);
      console.log(data);
      if (data && data.success) {
        localStorage.setItem("auth", JSON.stringify(data));

        // window.location.href = "/";
        toast(data.message);
        navigate("/");
      }
    } catch (error) {
      toast(error);
      console.log(error);
    }
  };
  return (
    <Layout>
      {loading && <Loaderr />}
      <div className="containerFromLoginAndRegsiter">
        <form className="form ">
          <h1 className="text-center">Login</h1>

          <div className="form-group">
            <input
              type="email"
              name={email}
              className="form-control-login"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter a email"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name={password}
              className="form-control-login"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter a Password"
            />
          </div>

          <button
            type="submit"
            className="loginBtn btn btn-dark"
            onClick={handleSubmit}>
            LOGIN
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
