import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { register_route } from "../api/routes";

function Register() {
  const [registerForm, setRegisterForm] = useState({
    email: "",
    password: "",
  });
  const [authRes, setAuthRes] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputs = (e) => {
    setRegisterForm({
      ...registerForm,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();

  const handleSubmission = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(register_route, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerForm),
      });
      const data = await res.json();
      if (res.ok) {
        navigate("/");
        setRegisterForm({
          email: "",
          password: "",
        });
      } else {
        setAuthRes(data.message);
      }
    } catch (error) {
      console.log(error);
      setAuthRes("Please try again");
    }
    setLoading(false);
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
      <div className="main text-center"> {/* Added text-center class */}
        <div className="text-center">
          <label className="font-header font-poppins font-bold mb-3">
            Register
          </label>
        </div>
        <form onSubmit={handleSubmission}>
          <div className="input-group">
            <label htmlFor="email" className="label-text">Email:</label>
            <span className="tab"></span>
            <input
                type="email"
                id="email"
                name="email"
                value={registerForm.email}
                onChange={handleInputs}
                className="input-field"
                required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password" className="label-text">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={registerForm.password}
              onChange={handleInputs}
              className="input-field"
              minLength={6}
              required
            />
          </div>
          {authRes && (
            <label className="text-red font-poppins">{authRes}</label>
          )}
          <div className="button-container">
            <button type="submit" disabled={loading} className="register-button">
              {loading ? "Registering..." : "Register"}
            </button>
          </div>
          <div className="login-link">
            <span className="font-poppins mr-1">Already have an account?</span>
            <Link to="/" className="td-none font-poppins">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
