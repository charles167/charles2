import React, { useEffect, useState } from "react";
import Nav from "../Nav/Nav";
import "./About.css";
import { CiPlay1 } from "react-icons/ci";
import Footer from "../footer/Footer";
import background from "../images/Background1.jpg";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";
import FeedBack from "../FeedBack/FeedBack";
const About = () => {
  //getting review state
  const [review, setReview] = useState([]);
  //loader state
  const [loader, setLoader] = useState(false);
  const getAllReviews = async () => {
    try {
      setLoader(true);
      const response = await axios.get("https://server-ten-gilt.vercel.app/allReivew");
      setReview(response.data.message);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    getAllReviews();
  }, []);
  return (
    <div>
      <Nav />
      <div className="PageBody">
        <div className="Image-Background">
          <div className="overlayBackground">
            <div className="welcome-logo">Welcome to reignboxes</div>
            <div className="about-header-content">
              Enjoy Quick Delivery with
              <br />
              Reign-Boxes
            </div>
            <div className="instructional-Video-Icon">
              <CiPlay1 />
            </div>
          </div>
        </div>
        <div className="about-offer">
          <div className="about-offer-content">
            <div className="about-offer-head">
              Here at reignboxes we Provide the best delivery service in
             nigeria
            </div>
            <div className="about-offer-content ">
              <div className="about-offer-items">
                <IoMdCheckmarkCircleOutline color="green" />
                Enjoy fast and reliable delivery
              </div>
              <div className="about-offer-items">
                <IoMdCheckmarkCircleOutline color="green" />
                Easy to use
              </div>
            </div>
          </div>
          <div className="about-offer-images-container d-md-flex d-sm-block gap-5">
            <div className="about-offer-items-cont">
              <img
                src="https://cdn.shopify.com/s/files/1/1246/6441/files/Vendor_sourcing.jpg?v=1644447534"
                alt=""
                className="about-offer-items-image"
              />
              <div className="about-offer-items-content">
                <div className="d-flex align-items-center justify-content-center text-center mt-5 ">
                  <div>
                    10+
                    <br />
                    Vendors
                  </div>
                </div>
              </div>
            </div>
            <div className="about-offer-items-cont">
              <img
                src="https://cdn.shopify.com/s/files/1/1246/6441/files/Vendor_sourcing.jpg?v=1644447534"
                alt=""
                className="about-offer-items-image"
              />
              <div className="about-offer-items-content">
                <div className="d-flex align-items-center justify-content-center text-center mt-5 ">
                  <div>
                    10+
                    <br />
                    Vendors
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="our-mission-container">
          <div>
            <img src={background} alt="" className="our-mission-img" />
          </div>
          <div className="our-mission-content">
            <div className="our-mission-head">Our Mission</div>
            <div className="our-mission-note">
              reignboxes was developed to address the unique dining needs of
              students and staff atnigeria. We recognized that
              campus life often makes it challenging to access a variety of meal
              options conveniently and affordably. Our goal is to simplify meal
              delivery by offering a seamless service that brings a range of
              food choices directly to your hostel or campus area. Additionally,
             reignboxes aims to support the university community by providing
              employment opportunities for students, helping them earn an income
              while balancing their academic responsibilities. By connecting
              students with local vendors and ensuring timely deliveries,
              reignboxes enhances the campus dining experience and contributes
              to the overall well-being of the university community.
            </div>
          </div>
        </div>
        <div>
          <FeedBack />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default About;
