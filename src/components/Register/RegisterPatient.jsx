import React, { useState, useEffect } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db, UseFirebaseValue } from "../../Firebase";
import { useNavigate } from "react-router-dom";
import "./register.css";

const RegisterPatient = () => {
  const [style, setStyle] = useState({});
  const [{ error }, dispatch] = UseFirebaseValue();
  useEffect(() => {
    setStyle({
      transition: "transform 1.5s ease-in-out",
      transform: "translateY(15%)",
    });
    const timer = setTimeout(() => {
      dispatch({
        type: "UserAlreadyExist",
        error: null,
      });
    }, 2000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line
  }, [error]);
  const navigate = useNavigate();
  const [inputValues, setInputValues] = useState({
    firstname: "",
    middlename: "",
    lastname: "",
    gender: "Male",
    age: "",
    mobilenumber: "",
    address: "",
  });
  const generateId = `${inputValues.firstname.toLowerCase()}${String(
    inputValues.mobilenumber
  ).slice(-4)}`;
  const id = generateId.replace(/ /g, "");
  const submitHandler = async (e) => {
    e.preventDefault();
    const docRef = doc(db, "Patients", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      dispatch({
        type: "UserAlreadyExist",
        error: "User Already Exist",
      });
    } else {
      const data = {
        id: id,
        firstname: inputValues.firstname.toLowerCase(),
        middlename: inputValues.middlename.toLowerCase(),
        lastname: inputValues.lastname.toLowerCase(),
        gender: inputValues.gender,
        age: Number(inputValues.age),
        mobilenumber: Number(inputValues.mobilenumber),
        address: inputValues.address,
      };
      await setDoc(docRef, data);
      dispatch({
        type: "setDialog",
        dialog: {
          open: "plain",
          message: "succesfully registered",
        },
      });
      navigate("/");
    }
  };
  return (
    <div className="register-div" style={style}>
      <form onSubmit={submitHandler}>
        <div className="full-name">
          <div className="first-name">
            <label className="div-label">First Name</label>
            <input
              type="text"
              placeholder="Your name.."
              required
              onChange={(e) =>
                setInputValues({ ...inputValues, firstname: e.target.value })
              }
            />
          </div>
          <div className="middle-name">
            <label className="div-label">Middle Name</label>
            <input
              type="text"
              placeholder="Your middle name.."
              required
              onChange={(e) =>
                setInputValues({ ...inputValues, middlename: e.target.value })
              }
            />
          </div>
          <div className="last-name">
            <label className="div-label">Last Name</label>
            <input
              type="text"
              placeholder="Your last name.."
              required
              onChange={(e) =>
                setInputValues({ ...inputValues, lastname: e.target.value })
              }
            />
          </div>
        </div>
        <label className="div-label">Gender</label>
        <select
          required
          value={inputValues.gender}
          onChange={(e) =>
            setInputValues({ ...inputValues, gender: e.target.value })
          }
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Prefer Not To Say">Prefer Not to say</option>
        </select>
        <label className="div-label">Age</label>
        <input
          type="text"
          placeholder="Your age.."
          required
          maxLength="2"
          title="Please Enter Number Correctly"
          pattern="[0-9]{0,99}"
          onChange={(e) =>
            setInputValues({ ...inputValues, age: e.target.value })
          }
        />
        <label className="div-label">Mobile Number</label>
        <input
          type="text"
          placeholder="Your Mobile Number.."
          required
          maxLength="10"
          pattern="[1-9]{1}[0-9]{9}"
          title="Please Enter Number Correctly"
          onChange={(e) =>
            setInputValues({ ...inputValues, mobilenumber: e.target.value })
          }
        />
        <label className="div-label">Address</label>
        <input
          type="text"
          placeholder="Your Address.."
          required
          onChange={(e) =>
            setInputValues({ ...inputValues, address: e.target.value })
          }
        />
        <h3 style={{ color: "red" }}>{error}</h3>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default RegisterPatient;
