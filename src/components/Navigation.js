import React from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../contexts/authContext";

function Navigation() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const user = useAuthStore((state) => state.user);
  const handleLogout = useAuthStore((state) => state.setIsLoggedIn);

  const handleLogoutClick = () => {
    localStorage.removeItem("authToken");
    handleLogout(false);
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {isLoggedIn ? (
          <>
            <li>
              <Link to="/blogs">All Blogs</Link>
            </li>
            <li>
              <Link to="/add-blog">Add Blog</Link>
            </li>
            <li>
              <Link to={`/users/${user._id}`}>{user.name}</Link>
            </li>
            <li>
              <button onClick={handleLogoutClick}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/signup">Sign Up</Link>
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
