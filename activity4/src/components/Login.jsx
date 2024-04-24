import { Link } from "react-router-dom";
import { useState } from "react";
import { login_route } from "../api/routes.js";

function Login() {
  const [formLogin, setFormLogin] = useState({
    email: "",
    password: "",
  });
  const [authRes, setAuthRes] = useState(null);

  const handleInputs = (e) => {
    setFormLogin({
      ...formLogin,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmission = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(login_route, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formLogin),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("email", data.email);
        window.location.href = "/products";
      } else {
        setAuthRes("Please Try Again!");
      }
    } catch (error) {
      console.log(error);
      setAuthRes("Please Try Again");
    }
  };

  return (
    <div className="wrapper">
      <div className="header">
        <div className="desc-relative">
          <label className="big-header font-poppins text-center">Activity 4</label>
          <label className="big-subheader font-poppins text-center text-gray">
            React + API
          </label>
        </div>
      </div>
      <div className="main text-center">
      <div className="text-center">
          <label className="font-header font-poppins font-bold mb-3">
            Login
          </label>
        </div>
        <form onSubmit={handleSubmission}>
          <div className="input-group">
          <label htmlFor="email" className="label-text">Email:</label>
          <span className="tab"></span>
            <input
              type="email"
              name="email"
              value={formLogin.email}
              onChange={handleInputs}
              required
              className="input-field"
            />
          </div>
          <div className="input-group">
          <label htmlFor="email" className="label-text">Password:</label>
            <input
              type="password"
              name="password"
              value={formLogin.password}
              onChange={handleInputs}
              required
              className="input-field"
            />
          </div>
          {authRes && (
            <label className="text-red font-poppins">{authRes}</label>
          )}
          <div className="button-container">
            <button className="register-button" type="submit">
              Login
            </button>
          </div>
          <div className="login-link">
            <span className="font-poppins mr-1">Don&apos;t have an account?</span>
            <Link to="/register" className="td-none font-poppins">Register</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
