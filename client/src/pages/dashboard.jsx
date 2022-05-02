import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutThunk } from "../features/auth/authSlice";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutThunk);
  };

  return (
    <div className="container">
      <nav className="nav">
        <div className="nav_brand">
          Recipe Chef
          <ul className="navlist">
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
        </div>
      </nav>
      <h1> Welcome to your dashboard {user && user.user.firstName}</h1>
    </div>
  );
};

export default Dashboard;
