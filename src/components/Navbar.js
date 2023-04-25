import { Link } from "react-router-dom";
import { useAuthContext } from "../contexts/authContext";

function Navbar() {
  const { user, logout } = useAuthContext();

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        {user && (
          <li>
            <button onClick={logout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
