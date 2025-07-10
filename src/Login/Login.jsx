import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/WhatsApp Image 2024-08-24 at 20.18.12_988ce6f9.jpg";
import { MdAdminPanelSettings, MdOutlineRemoveRedEye } from "react-icons/md";
import { FaLock, FaRegEyeSlash, FaUser } from "react-icons/fa6";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import { ToastContainer, toast } from "react-toastify";
import lottie from "../assets/Animation - 1725013554580.json";
import "react-toastify/dist/ReactToastify.css";
const Login = () => {
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  const [password, setPassword] = useState("");
  const input = password.toLocaleLowerCase();

  const pageNavigate = () => {
    navigate("/landing_Page");
    localStorage.setItem("modalShown", "true");
  };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (input === "reignboxes") {
  //     toast.success("login successful");
  //     localStorage.setItem("modalShown", "true"); // Set flag to prevent future display
  //     navigate("/landing_Page");
  //   } else if (input === "") {
  //     toast.error("input is required");
  //   } else {
  //     toast.error("invalid password");
  //   }
  // };

  return (
    <div>
      <div className="Form_nav">
        <img src={logo} alt="" className="logo" />
        <Link className="Vendor-click" to="/VendorLogin">
          <FaUser size={20} color="white" />
        </Link>
      </div>
      <div className="Form_container">
        <div>
          <Player autoplay loop src={lottie} className="lottiefiles">
            <Controls
              visible={false}
              buttons={["play", "repeat", "frame", "debug"]}
            />
          </Player>
        </div>
        <div>
          <div className="Name ms-4">
            Enjoy fast delivery service with reignboxes
          </div>
          <button
            onClick={() => pageNavigate()}
            className="continueButton shadow-sm"
          >
            continue shopping
          </button>
        </div>
      </div>
      {/* <form onSubmit={handleSubmit}>
          <div className="form-group">
            <p className="Head">Login</p>
            <p
              style={{
                color: "#787878",
                fontWeight: "600",
              }}
            >
              Please sign-in to continue
            </p>
            <div
              style={{
                backgroundColor: "white",
                display: "flex",
                alignItems: "center",
                paddingLeft: "20px",
                paddingRight: "20px",
                gap: "10px",
                backgroundColor: "#1c1c1c10",
                // border: "1px solid #1c1c1c20",
                borderRadius: 10,
              }}
              className="shadow-sm"
            >
              <FaLock />
              <input
                type={toggle ? "text" : "password"}
                placeholder="input password.."
                style={{
                  padding: "15px",
                  backgroundColor: "transparent",
                  outline: "none",
                  width: "250px",
                  border: "none",
                }}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              {toggle ? (
                <FaRegEyeSlash
                  onClick={() => {
                    setToggle(false);
                  }}
                  style={{
                    cursor: "pointer",
                  }}
                />
              ) : (
                <MdOutlineRemoveRedEye
                  onClick={() => {
                    setToggle(true);
                  }}
                  style={{
                    cursor: "pointer",
                  }}
                />
              )}
            </div>
            <button
              className="button"
              style={{
                backgroundColor: "#bd5559",
                color: "#fff",
                fontWeight: "bold",
                fontSize: "15px",
                border: "none",
                padding: "15px 50px",
                width: "100%",
                borderRadius: 10,
                marginTop: 30,
              }}
              type="submit"
            >
              Sign In
            </button>
          </div>
        </form> */}

      {/*toast container*/}
      <ToastContainer />
    </div>
  );
};

export default Login;
