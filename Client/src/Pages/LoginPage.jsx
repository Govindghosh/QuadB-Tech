import { useState } from "react";
import useLogin from "../Hooks/useLogin";

const LoginForm = () => {
  const { loading, login } = useLogin();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData);
    setFormData({
        email: "",
        username: "",
        password: "",
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </label>
      <label>
        Username:
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </label>
      <button type="submit" disabled={loading}>
        {loading ? "Loading..." : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;
