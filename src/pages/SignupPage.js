import React from "react";
import SignupForm from "../components/SignupForm";
import { useAuthContext } from "../contexts/authContext";

function SignupPage() {
  const { isLoggedIn } = useAuthContext();

  return (
    <div>
      {isLoggedIn ? (
        <p>You are already signed up and logged in.</p>
      ) : (
        <div>
          <h2>Sign up for an account</h2>
          <SignupForm />
        </div>
      )}
    </div>
  );
}

export default SignupPage;
