import React, { useContext, useState, useEffect } from "react";
import "./Payment.css";
import background from "../assets/WhatsApp Image 2024-08-24 at 20.18.12_988ce6f9.jpg";
import hourglass from "../assets/hourglass.png";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { CiPhone, CiUser } from "react-icons/ci";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaIdCard,
  FaMoneyBill,
  FaPaperPlane,
  FaRegCopy,
  FaStore,
} from "react-icons/fa";
// import { LuUploadCloud } from "react-icons/lu";
import { useLocation, useNavigate } from "react-router-dom";
// import { FiPackage } from "react-icons/fi";
import { ContextApi } from "../ShopContext/ShopContext";
import axios from "axios";
import swal from "sweetalert";
// import { FaNoteSticky, FaPaperclip, FaWhatsapp } from "react-icons/fa6";
import formBlob from "../assets/login1.png";
import PaystackPop from "@paystack/inline-js";

import { useRef } from "react";

const Payment = () => {
  const { cartItms, clearCart } = useContext(ContextApi);
  const [formErrors, setFormErrors] = useState({});

  const location = useLocation();
  const {
    receiptID,
    total,
    cartItem,
    vendor,
    deliveryFee,
    serviceFee,
    checked,
  } = location.state || {};

  const navigate = useNavigate();
  // const [copied, setCopied] = useState(false);
  const textToCopy = "6413130454";
  const [loader, setLoader] = useState(false);
  const publickey = "pk_test_5ac46e7a76fb898fd59e40a3f6f4c93dd1c2fd51";
  // Form state with cart items and their quantities
  const [form, setForm] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    WhatsApp: "",
    gender: "",
    totalPrice: total || "",
    Address: "",
    orderId: receiptID || "",
    Note: "",
    cartItems: cartItem, // Initialize with an empty array
    Vendor: vendor || "",
  });

  // Populate cart items with product names and quantities
  useEffect(() => {
    if (cartItem?.length > 0 && cartItms) {
      const updatedCartItems = cartItem.map((item) => ({
        category: item.category,
        productId: item.id,
        productName: item.Pname,
        quantity: cartItms[item.id] || 1, // Default quantity to 1 if undefined
        FoodPrice: Number(item.price) * cartItms[item.id] || 1,
      }));
      console.log(updatedCartItems);

      setForm((prevForm) => ({
        ...prevForm,
        cartItems: updatedCartItems,
      }));
    }
  }, [cartItem, cartItms]);

  // Handle form input change
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setForm({ ...form, [name]: value });
  };
  const showErrorAlert = () => {
    swal({
      title: "Error!",
      text: "Network Error, try again.",
      icon: "error",
      buttons: {
        confirm: {
          text: "Okay",
          value: true,
          visible: true,
          className: "btn btn-danger",
          closeModal: true,
        },
      },
    });
  };
  const validateForm = () => {
    let errors = {};

    if (!form.name.trim()) errors.name = "Name is required";
    if (!form.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      errors.email = "Invalid email format";
    }

    if (!form.phoneNumber.trim()) {
      errors.phoneNumber = "Phone number is required";
    } else if (!/^\d{11}$/.test(form.phoneNumber)) {
      errors.phoneNumber = "Phone number must be 11 digits";
    }
    if (!form.WhatsApp.trim()) {
      errors.WhatsApp = "What app number is required";
    } else if (!/^\d{11}$/.test(form.WhatsApp)) {
      errors.WhatsApp = "WhatApp number must be 11 digits";
    }
    if (checked === false) {
      if (!form.Address.trim()) errors.Address = "Address is required";
      if (!form.gender) errors.gender = "Gender selection is required";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePaymentSuccess = async (res) => {
    if (!validateForm()) {
      toast.error("Please fill all required fields correctly.");
      return;
    }

    console.log("User Details:", form); // Log user details

    const formDataObject = {
      name: form.name,
      phoneNumber: form.phoneNumber,
      WhatsApp: form.WhatsApp,
      gender: form.gender,
      totalPrice: form.totalPrice,
      Address: form.Address,
      orderId: form.orderId,
      Note: form.Note,
      Vendor: form.Vendor,
      email: form.email,
      cartItems: JSON.stringify(form.cartItems),
    };

    console.log("Sending Data:", JSON.stringify(formDataObject, null, 2)); // Debugging

    try {
      setLoader(true);
      const response = await axios.post(
        "https://server-ten-gilt.vercel.app/PostOrder",
        formDataObject,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200 || response.status === 201) {
        console.log("Payment Success:", response.data);
        navigate("/order", { state: { form, deliveryFee, serviceFee } });
        clearCart();
      } else {
        showErrorAlert();
      }
    } catch (error) {
      console.error(
        "Error Response:",
        error.response ? error.response.data : error.message
      );
      showErrorAlert();
    } finally {
      setLoader(false);
    }
  };
  const calculatePaystackCharges = (amount) => {
    const percentageCharge = 0.015 * amount; // 1.5% of the total
    const additionalCharge = amount <= 250000 ? 10000 : 0; // ₦100 extra for transactions ≤ ₦2500
    const cappedCharge = Math.min(percentageCharge + additionalCharge, 200000); // Max ₦2000 cap
    return Math.round(cappedCharge); // Convert to the nearest integer for Kobo
  };
  const paystackCharges = calculatePaystackCharges(total * 100); // Convert total to Kobo
  const totalAmountWithCharges = Math.round(total * 100 + paystackCharges); // Final amount in Kobo
  const handlePaystackPayment = () => {
    if (!validateForm()) {
      return;
    }

    const paystack = new PaystackPop();
    paystack.newTransaction({
      key: publickey, // Replace with your Paystack Public Key
      email: form.email,
      amount: totalAmountWithCharges, // Convert to Kobo (smallest unit)
      currency: "NGN",
      reference: `MS_${new Date().getTime()}`, // Generate unique reference
      metadata: {
        name: form.name || "No Name",
        phoneNumber: form.phoneNumber || "No Phone",
      },
      onSuccess: (response) => {
        toast.success("Payment successful!");
        console.log("Payment Response:", response);
        handlePaymentSuccess(response);
      },
      onCancel: () => {
        toast.error("Payment was canceled.");
      },
    });
  };

  const paystackConfig = {
    email: form.email,
    amount: Math.round(total * 100), // Ensure it's an integer in Kobo
    publicKey: publickey,
    reference: `MS_${new Date().getTime()}`, // Generate unique reference
    currency: "NGN",
    metadata: {
      name: form.name || "No Name",
      phoneNumber: form.phoneNumber || "No Phone",
    },
    text: "Pay Now",
    onSuccess: handlePaymentSuccess,
    onClose: () => alert("Are you sure you want to close?"),
  };

  // Log config to check for missing fields
  console.log("Paystack Config:", paystackConfig);

  // Handle copy to clipboard
  // const handleCopy = () => {
  //   if (navigator.clipboard && window.isSecureContext) {
  //     navigator.clipboard.writeText(textToCopy).then(() => {
  //       setCopied(true);
  //       toast.success("Copied to clipboard!");
  //       setTimeout(() => setCopied(false), 2000);
  //     });
  //   } else {
  //     const textArea = document.createElement("textarea");
  //     textArea.value = textToCopy;
  //     document.body.appendChild(textArea);
  //     textArea.select();
  //     try {
  //       document.execCommand("copy");
  //       setCopied(true);
  //       toast.success("Copied to clipboard!");
  //     } catch (err) {
  //       console.error("Failed to copy: ", err);
  //       toast.error("Failed to copy text.");
  //     }
  //     document.body.removeChild(textArea);
  //     setTimeout(() => setCopied(false), 2000);
  //   }
  // };

  // const handlePaymentSuccess = async (response) => {
  //   try {
  //     setLoader(true);

  //     const formData = new FormData();
  //     formData.append("name", form.name);
  //     formData.append("phoneNumber", form.phoneNumber);
  //     formData.append("WhatsApp", form.WhatsApp);
  //     formData.append("gender", form.gender);
  //     formData.append("totalPrice", form.totalPrice);
  //     formData.append("Address", form.Address);
  //     formData.append("orderId", form.orderId);
  //     formData.append("Note", form.Note);
  //     formData.append("cartItems", JSON.stringify(form.cartItems));
  //     formData.append("Vendor", form.Vendor);

  //     const response = await axios.post(
  //       "https://server-ten-gilt.vercel.app/PostOrder",
  //       formData,
  //       {
  //         headers: { "Content-Type": "multipart/form-data" },
  //       }
  //     );

  //     if (response.status === 200) {
  //       navigate("/order", { state: { form, deliveryFee, serviceFee } });
  //     } else {
  //       swal({
  //         title: "Error!",
  //         text: "Network Error, try again.",
  //         icon: "error",
  //         buttons: {
  //           confirm: {
  //             text: "Okay",
  //             value: true,
  //             visible: true,
  //             className: "btn btn-danger",
  //             closeModal: true,
  //           },
  //         },
  //       });
  //     }
  //   } catch (error) {
  //     console.error(error.message);
  //     swal({
  //       title: "Error!",
  //       text: "Something went wrong. Try again.",
  //       icon: "error",
  //       buttons: {
  //         confirm: {
  //           text: "Okay",
  //           value: true,
  //           visible: true,
  //           className: "btn btn-danger",
  //           closeModal: true,
  //         },
  //       },
  //     });
  //   } finally {
  //     setLoader(false);
  //   }
  // };
  return (
    <div>
      <div className="header">
        <div className="back m-3" onClick={() => window.history.back()}>
          <MdKeyboardArrowLeft size={30} />
        </div>

        <div className="bread-crumbs">
          <div className="bread-crumbs-container">
            <div className="Bread-crumbs-Header">Checkout</div>
            <div className="d-flex gap-1 breadCrumb-content">
              <div
                onClick={() => navigate("/home")}
                style={{
                  cursor: "pointer",
                }}
              >
                Home
              </div>
              <div>
                <img
                  width="10"
                  height="10"
                  src="https://img.icons8.com/ios-glyphs/30/forward.png"
                  alt="forward"
                />
              </div>
              <span>checkout</span>
            </div>
          </div>
        </div>

        <div className="form-container2">
          <div>
            <img src={formBlob} alt="" className="form-blob" />
          </div>
          <div className="mt-5">
            <div className="form-body">
              <div className="headercontact">Contact Information</div>
              <div className="headercontact2 mb-1">
                input all contact information
              </div>
              <div className="instruction">
                Please ensure that all fields are filled out before proceeding.
                Every input is required to complete this form successfully
              </div>
              <div className="frm">
                <div className="review-form shadow p-4">
                  <form onSubmit={(e) => e.preventDefault()}>
                    <div className="form-flex">
                      <div className="review-form-item ">
                        <label htmlFor="name">Your Name</label>

                        <input type="text" onChange={handleInput} name="name" />
                        {formErrors.name && (
                          <span className="error">{formErrors.name}</span>
                        )}
                      </div>
                      <div className="review-form-item ">
                        <label htmlFor="phone">Phone number</label>

                        <input
                          type="text"
                          onChange={handleInput}
                          name="phoneNumber"
                        />
                        {formErrors.phoneNumber && (
                          <span className="error">
                            {formErrors.phoneNumber}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="review-form-item ">
                      <label htmlFor="phone">Email</label>

                      <input type="email" onChange={handleInput} name="email" />
                      {formErrors.email && (
                        <span className="error">{formErrors.email}</span>
                      )}
                    </div>

                    <div className="form-flex">
                      <div className="review-form-item ">
                        <label htmlFor="phone">Note</label>

                        <input
                          type="text"
                          onChange={handleInput}
                          placeholder="(Optional)"
                          name="Note"
                        />
                      </div>

                      <div className="review-form-item">
                        <label htmlFor="phone">WhatsApp</label>

                        <input
                          type="text"
                          onChange={handleInput}
                          name="WhatsApp"
                        />
                        {formErrors.WhatsApp && (
                          <span className="error">{formErrors.WhatsApp}</span>
                        )}
                      </div>
                    </div>

                    <div className="review-form-item">
                      <label htmlFor="gender">Gender</label>
                      <br />
                      <select onChange={handleInput} name="gender">
                        <option value="">Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                      {formErrors.gender && (
                        <span className="error">{formErrors.gender}</span>
                      )}
                    </div>
                    {checked === true ? null : (
                      <div className="review-form-item">
                        <label htmlFor="location">Location</label>
                        <textarea
                          onChange={handleInput}
                          name="Address"
                          className="p-2 mt-1"
                        ></textarea>
                        {formErrors.Address && (
                          <span className="error">{formErrors.Address}</span>
                        )}
                      </div>
                    )}
                    {/* <button
                    className="submit-btn"
                    onClick={handlePaymentSuccess}
                    disabled={loader}
                  >
                    {loader ? "Processing..." : "Submit Order"}
                  </button> */}
                    <button
                      onClick={handlePaystackPayment}
                      className="review-button"
                    >
                      Pay with Paystack
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Payment;
