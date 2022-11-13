import React from "react";
import "../App.css";
import { useState } from "react";
import Textarea from "@mui/joy/Textarea";
import { auth, UseFirebaseValue } from "../Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
  });
  const [, dispatch] = UseFirebaseValue();

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
        console.log(errorMessage);
      });
  }

  return (
    <div className="login-div">
      <img
        src="https://firebasestorage.googleapis.com/v0/b/doc-hub-1a597.appspot.com/o/doctor-ged6944a83_1280.png?alt=media&token=659e56f5-fed6-48ea-bac5-65843fa3a5b3"
        alt="login"
      ></img>
      <form onSubmit={submitHandler}>
        <Textarea
          color="success"
          disabled={false}
          minRows={1.5}
          placeholder="Email"
          size="md"
          variant="outlined"
          className="login-text-email"
          value={inputValues.email}
          onChange={(e) =>
            setInputValues({ ...inputValues, email: e.target.value })
          }
          required
        />
        <Textarea
          color="success"
          disabled={false}
          minRows={1.5}
          placeholder="Password"
          size="md"
          variant="outlined"
          className="login-text-email"
          value={inputValues.password}
          onChange={(e) =>
            setInputValues({ ...inputValues, password: e.target.value })
          }
          required
        />
        <button className="login-button" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
