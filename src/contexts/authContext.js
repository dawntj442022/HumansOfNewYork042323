import React, { createContext, useContext, useState } from "react";
import { loginApi, logoutApi, signupApi } from "../api/authApi";

const AuthContext = createContext();

function AuthProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  async function signup(userData) {
    try {
      const response = await signupApi(userData);
      setUser(response.user);
      setIsLoggedIn(true);
    } catch (error) {
      console.error(error);
      throw new Error("Failed to create an account. Please try again.");
    }
  }

  async function login(userData) {
    try {
      const response = await loginApi(userData);
      setUser(response.user);
      setIsLoggedIn(true);
    } catch (error) {
      console.error(error);
      throw new Error("Invalid credentials. Please try again.");
    }
  }

  async function logout() {
    try {
      await logoutApi();
      setUser(null);
      setIsLoggedIn(false);
    } catch (error) {
      console.error(error);
      throw new Error("Failed to logout. Please try again.");
    }
  }

  const value = {
    isLoggedIn,
    user,
    signup,
    login,
    logout,
  };

  return <AuthContext.Provider value={value} {...props} />;
}

function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuthContext };
