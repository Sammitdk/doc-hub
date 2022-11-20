import React from "react";
import "../App.css";
import { useState, useEffect } from "react";
import { auth, UseFirebaseValue } from "../Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
  });
  const [{ incorrectIdPass }, dispatch] = UseFirebaseValue();

  function submitHandler(e) {
    e.preventDefault();
    signInWithEmailAndPassword(auth, inputValues.email, inputValues.password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch({
          type: "setUser",
          user: user,
        });
        localStorage.setItem("User", JSON.stringify(user));
      })
      .catch((error) => {
        const errorMessage = error.message;
        dispatch({
          type: "WrongIdPass",
          incorrectIdPass: errorMessage,
        });
      });
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch({
        type: "WrongIdPass",
        error: null,
      });
    }, 2000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line
  }, [incorrectIdPass]);

  return (
    <div className="login-div">
      <img
        src="https://firebasestorage.googleapis.com/v0/b/doc-hub-1a597.appspot.com/o/doctor-ged6944a83_1280.png?alt=media&token=659e56f5-fed6-48ea-bac5-65843fa3a5b3"
        alt="login"
      ></img>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Email"
          required
          onChange={(e) =>
            setInputValues({ ...inputValues, email: e.target.value })
          }
        />
        <input
          type="password"
          placeholder="Password"
          required
          onChange={(e) =>
            setInputValues({ ...inputValues, password: e.target.value })
          }
        />
        <h4 style={{ color: "red" }}>{incorrectIdPass}</h4>
        <button className="login-button" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
