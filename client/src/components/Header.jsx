import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutThunk } from "../features/auth/authSlice";

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutThunk);
  };

  return (
    <nav>
      <div className="nav_brand">Recipe Chef</div>
      <ul className="navlist">
        <li className="nav-item">
          <Link to={"/"}>Home</Link>
        </li>
        <li className="nav-item">
          <Link to={"/my-recipes"}>my recipes</Link>
        </li>
        <li className="nav-item">
          <Link to={"/create"}>Add A Recipe</Link>
        </li>
        {user ? (
          <li className="nav-item">
            <button onClick={handleLogout}>Logout</button>
          </li>
        ) : (
          <>
            <li className="nav-item">
              <Link to={"/register"}>Register</Link>
            </li>
            <li className="nav-item">
              <Link to={"/login"}>Login</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Header;
