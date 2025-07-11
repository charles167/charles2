import React, { useState } from "react";
import Nav from "../Nav/Nav";
import "./Contact.css";
import { RiArrowRightSLine } from "react-icons/ri";
import map from "./map.png";
import mail from "./gmail.png";
import phone from "./phone-call.png";
import { CiInstagram, CiUser } from "react-icons/ci";
import { MdEmail } from "react-icons/md";
import { FaFacebookF } from "react-icons/fa";
import Footer from "../footer/Footer";
import swal from "sweetalert";
import axios from "axios";
import { FaWhatsapp } from "react-icons/fa6";
const Contact = () => {
  //form state
  const [form, setForm] = useState({
    name: "",
    Email: "",
    Content: "",
  });
  //loader state
  const [loader, setLoader] = useState(false);
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setForm({ ...form, [name]: value });
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      const response = await axios.post(
        "https://server-ten-gilt.vercel.app/review",
        form
      );
      if (response) {
        swal({
          title: "Success!",
          text: "Review has been successfully submitted ❤🎉",
          icon: "success",
        });
      } else {
        swal({
          title: "Error!",
          text: "Review cannot be submitted",
          icon: "error",
        });
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoader(false);
    }
  };
  return (
    <div>
      <Nav />
      <div className="ContactPage">
        {/* Breadcrumbs */}
        <div className="breadcrumb-container">
          <div className="bread-crumbs_content">
            <div style={{ fontSize: 35, fontWeight: "900" }}>Contact Us</div>
            <div style={{ fontSize: 16, fontWeight: "500" }}>
              Home <RiArrowRightSLine /> Contact
            </div>
          </div>
        </div>
        <div className="contact-information">
          <div className="contact-item shadow-sm">
            <div className="content-image shadow-sm">
              <img src={map} width={70} />
            </div>
            <div className="Content-head">Our Location</div>
            <div className="content">
              lagos state
            </div>
          </div>
          <div className="contact-item shadow-sm">
            <div className="content-image shadow-sm">
              <img src={mail} width={70} />
            </div>
            <div className="Content-head">Email Us</div>
            <div className="content">
              <a
                href="mailto:hello@reignboxes.com"
                className="text-none content "
              >
                hello@reignboxes.com
              </a>
            </div>
          </div>
          <div className="contact-item shadow-sm">
            <div className="content-image shadow-sm">
              <img src={phone} width={70} />
            </div>
            <div className="Content-head">Call Us</div>
            <div className="content">
              <a href="tel:+2348160609012" className="text-none content">
                +2348160609012
              </a>
            </div>
          </div>
        </div>
        <div className="customer-review-container">
          <div className="Review">
            <div className="reviewHeader">We'd love to hear from you</div>
            <div className="review-text">
              We'd love to hear from you! Whether you have a question, feedback,
              or need support, our team is here to help.
            </div>
            <div className="d-flex gap-2 mt-3">
              <div
                className="social-media-icons"
                onClick={() => {
                  window.location.replace(
                    "https://web.facebook.com/profile.php?id=61555818232401"
                  );
                }}
              >
                <FaFacebookF />
              </div>
              <div
                className="social-media-icons"
                onClick={() => {
                  window.location.replace(
                    "https://www.instagram.com/meal.section/"
                  );
                }}
              >
                <CiInstagram />
              </div>
              <div
                className="social-media-icons"
                onClick={() => {
                  window.location.replace("https://wa.me/+2348160609012");
                }}
              >
                <FaWhatsapp />
              </div>
            </div>
          </div>
          <div className="review-form shadow p-4">
            <form onSubmit={handleFormSubmit}>
              <div className="review-form-item">
                <label htmlFor="name">Your Name</label>
                <div className="d-flex align-items-center gap-2 form-input">
                  <CiUser size={20} />
                  <input
                    type="text"
                    onChange={handleInput}
                    placeholder="Input Name"
                    name="name"
                  />
                </div>
              </div>
              <div className="review-form-item">
                <label htmlFor="name">Your Email</label>
                <div className="d-flex align-items-center gap-2 form-input">
                  <MdEmail size={20} />
                  <input
                    type="mail"
                    onChange={handleInput}
                    placeholder="Input Email"
                    name="Email"
                  />
                </div>
              </div>
              <div className="review-form-item">
                <label htmlFor="name">Write Message</label>
                <br />

                <textarea
                  name="Content"
                  onChange={handleInput}
                  id=""
                  className="p-2 mt-2"
                  placeholder="write message here"
                ></textarea>
              </div>
              <div>
                <button className="review-submit-btn" type="submit">
                  {loader ? (
                    <>
                      <div
                        class="spinner-border spinner-border-sm"
                        role="status"
                      ></div>
                    </>
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="Iframe-Container p-3">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1981.7013357629291!2d3.075476866073142!3d6.596774157139453!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b77ea0e333d65%3A0x21e87021d9855208!2sCrawford%20University!5e0!3m2!1sen!2sng!4v1726957299429!5m2!1sen!2sng"
            width="100%"
            height="450"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
