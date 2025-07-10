import React, { useEffect, useState } from "react";
import "./FeedBack.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import axios from "axios";
import { ImQuotesLeft } from "react-icons/im";
const FeedBack = () => {
  const [review, setReview] = useState([]);
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
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true, // ✅ Enable auto-scrolling
    autoplaySpeed: 3000, // ✅ Wait for 3 seconds before scrolling
    pauseOnHover: true, // ✅ Pause if user hovers
    pauseOnFocus: true, // ✅ Pause if user interacts

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 760,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          centerMode: false,
          className: "center",
          centerPadding: "0",
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="feed">
      {/* /feed back  */}
      <div className="feed-back-container mt-4">
        <div className="header">
          <div className="feed_Back_SUbhead">Feed-Backs</div>
          <div className="feed-back-header">Our Trusted Clients</div>
        </div>
        <div className="feed-back">
          {loader ? (
            <div className="d-flex justify-content-center mt-5">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <Slider {...settings}>
              {review
                .filter((item) => item.show === true)
                .map((item) => (
                  <div className="feed-backs shadow-sm rounded p-3">
                    <div className="quote">
                      <ImQuotesLeft color="#0000003b" size={20} />
                    </div>
                    <div className="feed-back-content mt-2">{item.Content}</div>
                    <div
                      style={{
                        borderTop: "1px solid rgba(0, 0, 0, 0.14)",
                        paddingTop: "10px",
                        display: "flex",
                        gap: 10,
                        alignItems: "center",
                      }}
                    >
                      <img
                        width="35"
                        height="35"
                        src="https://img.icons8.com/3d-fluency/94/guest-male--v1.png"
                        alt="guest-male--v1"
                      />
                      <div>
                        <div className="user-feedback-name">{item.name}</div>
                        <div className="user-feedback-category">Student</div>
                      </div>
                    </div>
                  </div>
                ))}
            </Slider>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeedBack;
