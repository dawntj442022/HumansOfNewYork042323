import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useUserStore } from "../store";
import signupPageClasses from "./signupPageClasses";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setUser = useUserStore((state) => state.setUser);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/users/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
    if (res.ok) {
      const data = await res.json();
      console.log("Data received from server:", data); // Log the received data
      console.log("Token received:", data.token); // Add this line to verify the token
      setUser(data.user);
      localStorage.setItem("token", data.token);
      console.log("Token set in SignupPage:", localStorage.getItem("token"));
      history.push("/login");
      // history.push(`/users/${data.user._id}`);
    } else {
      const errorResponse = await res.json();
      alert(`Signup failed: ${errorResponse.errors.name.message}`);
    }
  };

  return (
    <div className={signupPageClasses}>
      <div className="container signup-container">
        <h1 className="text-center mt-5">Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              aria-describedby="nameHelp"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
