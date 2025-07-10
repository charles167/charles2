import React, { useState } from "react";
import "./VendorPage.css";
import { CiLock } from "react-icons/ci";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Vendors from "../Vendors/Vendors";
import { FiEye, FiEyeOff } from "react-icons/fi";

const VendorLogin = () => {
  const router = useNavigate();
  // form state
  const [login, setLogin] = useState("");
  const [formtoggle, setFormtoggle] = useState(true);
  const handleInput = (e) => {
    setLogin(e.target.value);
  };

  // comparing password
  const handleSubmit = (e) => {
    const AdminPassword = "awhanaadmin200";
    e.preventDefault();

    if (login === "") {
      toast.error("Input is required");
    } else if (
      login.toLocaleLowerCase() === AdminPassword.toLocaleLowerCase()
    ) {
      window.location.replace("http://adminpanel.reignboxes.com/");
    } else {
      // Find the vendor that matches the password
      const vendor = Vendors.find(
        (vendor) =>
          vendor.password.replace(/\s+/g, "").toLocaleLowerCase() ===
          login.replace(/\s+/g, "").toLocaleLowerCase()
      );

      if (vendor) {
        // Navigate to the vendor's page based on their name or path
        router(`/Admin/${vendor.name}`);
      } else {
        toast.error("Invalid login");
      }
    }
  };

  return (
    <div>
      <div className="container">
        <div className="vendor-login-head">Vendor Login</div>
        <div className="vendor-login-container shadow-sm">
          <form onSubmit={handleSubmit}>
            <label>Password</label>
            <div className="d-flex align-items-center gap-2 form-input">
              <CiLock size={20} />
              <input
                type={formtoggle ? "text" : "password"}
                placeholder="Input Vendor Password..."
                name="password"
                onChange={handleInput}
              />
              {formtoggle ? (
                <FiEyeOff
                  style={{ cursor: "pointer" }}
                  size={20}
                  onClick={() => setFormtoggle(false)}
                />
              ) : (
                <FiEye
                  style={{ cursor: "pointer" }}
                  size={20}
                  onClick={() => setFormtoggle(true)}
                />
              )}
            </div>
            <button className="Vendor-login-submit" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default VendorLogin;
