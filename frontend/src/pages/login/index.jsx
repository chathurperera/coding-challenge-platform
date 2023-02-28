import React, { useState, useEffect } from "react";
import styles from "./login.module.scss";
import Spinner from "../../components/Spinner";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import axios from "../../api/axios";

const Login = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginDetails, setLoginDetails] = useState({
    email: "john@gmail.com",
    password: "john123456",
  });

  /*
    chathurapereraaa@gmail.com
    chathura123456
  */

  const handleChange = (e) => {
    const { value, name } = e.target;
    setLoginDetails((prevDetails) => {
      return {
        ...prevDetails,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    loginDetails.email.trim();
    loginDetails.password.trim();
    setIsLoading(true);
    await axios
      .post("login", loginDetails)
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data));
        setIsLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setIsLoading(false);  
        error.response.data
          ? toast.error(error.response.data.message)
          : toast.error("Something went wrong");
      });
  };

  return (
    <main className={styles.login}>
      <div className={styles.loginLeft}>
        <div className={styles.loginLeftWrapper}>
          <h4 className={styles.title}>Login</h4>
          <p className={styles.desc}>
            Enter your credentials to access your account
          </p>
          <form onSubmit={handleSubmit}>
            <div className={styles.inputControl}>
              <label>Email address</label>
              <input
                type="text"
                required
                name="email"
                value={loginDetails.email}
                onChange={handleChange}
                placeholder="name@company.com"
              />
            </div>
            <div className={styles.inputControl}>
              <label>Password</label>
              <input
                type={showPassword ? "text" : "password"}
                required
                name="password"
                value={loginDetails.password}
                onChange={handleChange}
                placeholder="password"
              />
              <div
                className={styles.revealIcon}
                onClick={() => setShowPassword((prevState) => !prevState)}
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size="18px" color="#383838c6" />
                ) : (
                  <AiOutlineEye size="18px" color="#383838c6" />
                )}
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={styles.loginButton}
            >
              {isLoading ? <Spinner /> : "Login"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Login;
