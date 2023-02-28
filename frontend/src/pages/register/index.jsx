import React, { useState, useEffect } from "react";
import styles from "../login/login.module.scss";
import Spinner from "../../components/Spinner";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import axios from "../../api/axios";

const Register = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [registerDetails, setRegisterDetails] = useState({
    email: "jenny@gmail.com",
    password: "jenny123456",
  });
  const [confirmedPassword, setConfirmedPassword] = useState("");

  /*
    chathurapereraaa@gmail.com
    chathura123456
  */

  const handleChange = (e) => {
    const { value, name } = e.target;
    setRegisterDetails((prevDetails) => {
      return {
        ...prevDetails,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (confirmedPassword !== registerDetails.password) {
      return toast.error("Password doesn't match");
    }

    setIsLoading(true);
    await axios
      .post("register", registerDetails)
      .then((res) => {
        console.log("res", res);
        localStorage.setItem("user", JSON.stringify(res.data));
        navigate("/");
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        error.response.data
          ? toast.error(error.response.data.message)
          : toast.error("Something went wrong");
      });

    registerDetails.email.trim();
    registerDetails.password.trim();
  };

  return (
    <main className={styles.login}>
      <div className={styles.loginLeft}>
        <div className={styles.loginLeftWrapper}>
          <h4 className={styles.title}>Register</h4>
          <p className={styles.desc}>Fill the form</p>
          <form onSubmit={handleSubmit}>
            <div className={styles.inputControl}>
              <label>Email address</label>
              <input
                type="text"
                required
                name="email"
                value={registerDetails.email}
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
                value={registerDetails.password}
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
            <div className={styles.inputControl}>
              <label>Confirm Password</label>
              <input
                type={showPassword ? "text" : "password"}
                required
                name="password"
                value={confirmedPassword}
                onChange={(e) => setConfirmedPassword(e.target.value)}
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
              {isLoading ? <Spinner /> : "Register"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Register;
