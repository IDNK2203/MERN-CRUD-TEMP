import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login, reset } from "../features/auth/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setformData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const { status, errorMsg, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  useEffect(() => {
    if (user || status === "success") navigate("/");
  }, [user, status, navigate, dispatch]);

  if (status === "pending") {
    return <div>Spinner</div>;
  }

  const changeFormData = (e) => {
    setformData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSumbit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  return (
    <div className="container">
      <div className="form-heading">
        <h2>Login Form</h2>
      </div>

      <form onSubmit={handleSumbit}>
        <p>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={changeFormData}
            value={formData.email}
          />
        </p>
        <p>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={changeFormData}
            value={formData.password}
          />
        </p>{" "}
        <p>
          <button type="sumbit"> submit</button>
        </p>
      </form>
      {status === "error" && <div>{errorMsg}</div>}
    </div>
  );
};

export default Login;
