import React from "react";
import { Link } from "react-router-dom";
import { useUserStore } from "../store";

function Navigation() {
  const user = useUserStore((state) => state.user);

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {user ? (
          <>
            <li>
              <Link to="/user">My Posts</Link>
            </li>
            <li>
              <button onClick={() => useUserStore.setState({ user: null })}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;
