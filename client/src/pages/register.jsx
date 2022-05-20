import { register } from "../features/auth/authSlice";
import useReset from "../hooks/useReset";
import useAuthForm from "../hooks/useAuthForm";
import useAuthRedir from "../hooks/useAuthRedir";

const Register = () => {
  useReset();
  const { handleSumbit, changeFormData, formData } = useAuthForm(
    {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
    register
  );

  const { status, errorMsg } = useAuthRedir();
  return (
    <div className="container">
      {status === "pending" && <div>spinner</div>}

      <div className="form-heading">
        <h2>Registeration Form</h2>
      </div>

      <form onSubmit={handleSumbit}>
        <p>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            onChange={changeFormData}
            value={formData.firstName}
          />
        </p>
        <p>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            onChange={changeFormData}
            value={formData.lastName}
          />
        </p>
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
          <label htmlFor="confirmPassword">Confirm password</label>
          <input
            type="password"
            id="confirmPassword"
            name="passwordConfirm"
            onChange={changeFormData}
            value={formData.passwordConfirm}
          />
        </p>
        <p>
          <button type="sumbit"> submit</button>
        </p>
      </form>
      {status === "error" && <div>{errorMsg}</div>}
    </div>
  );
};

export default Register;
