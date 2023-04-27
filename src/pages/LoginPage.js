import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useUserStore } from "../store";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setUser = useUserStore((state) => state.setUser);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login form data:", { email, password });
    const res = await fetch("/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    if (res.ok) {
      const data = await res.json();
      setUser(data.user);
      localStorage.setItem("token", data.token);
      history.push("/user");
    } else {
      alert("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="container">
      <h1 className="text-center mt-5">Log In</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
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
          Log In
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
