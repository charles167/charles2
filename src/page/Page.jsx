import React, { useEffect, useState } from "react";
import "./Page.css";
import { RiArrowRightSLine } from "react-icons/ri";
import pasta from "../assets/pasta.png";
import Drinks from "../assets/soft-drink (2).png";
import junk from "../assets/fast-food.png";
import pastry from "../assets/pastry.png";
import bike from "../assets/delivery-bike.png";
import Placeholder from "../assets/placeholder.png";
import shoppingcart from "../assets/shopping-cart.png";
import pexels from "../assets/pexels.jpg";
import Nav from "../Nav/Nav";
import Vendors from "../Vendors/Vendors";
import { TbCurrencyNaira, TbMotorbike } from "react-icons/tb";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { FaStar, FaStore } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { IoMdClose } from "react-icons/io";
import FeedBack from "../FeedBack/FeedBack";
import all_product from "../All_Product/all_product";
import Items from "../Items/Items";
import { toast } from "react-toastify";

const Page = () => {
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modal, setModal] = useState([]);
  const [shuffledVendors, setShuffledVendors] = useState([]);
  const [review, setReview] = useState([]);
  const [loader, setLoader] = useState(false);
  const [product, setProduct] = useState([]);
  const [loader2, SetLoader] = useState(false);
  const getAllProduct = async () => {
    try {
      SetLoader(true);
      const response = await axios.get(`https://server-ten-gilt.vercel.app/getalProducts`);
      if (response) {
        setProduct(response.data.response);
        console.log(response.data.response);
      } else {
        toast.error("Internet error");
      }
    } catch (error) {
      console.log(error);
    } finally {
      SetLoader(false);
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);
  // Shuffle vendors
  const shuffleArray = (array) => {
    let shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Pagination logic
  const [currentPage, setCurrentPage] = useState(1);
  const vendorsPerPage = 6;
  const indexOfLastVendor = currentPage * vendorsPerPage;
  const indexOfFirstVendor = indexOfLastVendor - vendorsPerPage;
  const currentVendors = shuffledVendors.slice(
    indexOfFirstVendor,
    indexOfLastVendor
  );
  const pageNumbers = Array.from(
    { length: Math.ceil(Vendors.length / vendorsPerPage) },
    (_, i) => i + 1
  );

  // Fetch modal
  const getAllModal = async () => {
    try {
      const response = await axios.get("https://server-ten-gilt.vercel.app/note");
      if (response.data?.data?.length > 0) {
        setModal(response.data.data);
        setTimeout(() => {
          setModalIsOpen(true);
          localStorage.getItem("modalShown", "true");
        }, 3000);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // Fetch reviews
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
    setShuffledVendors(shuffleArray(Vendors));
    getAllModal();
    getAllReviews();
  }, []);

  useEffect(() => {
    const modalShown = localStorage.getItem("modalShown");
    if (modalShown) {
      const timer = setTimeout(() => {
        setModalIsOpen(true);
        getAllModal(); // Only fetch modal data if it should show
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <>
      <Nav />
      <div className="PageBody">
        {/* Breadcrumbs */}
        <div className="breadcrumb-container">
          <div className="bread-crumbs_content">
            <div className="bread-crumb-head">reignboxes</div>
            <div style={{ fontSize: 16, fontWeight: "500" }}>
              Home <RiArrowRightSLine /> Vendors
            </div>
          </div>
        </div>

        {/* Offer Section */}
        <div className="offer-container">
          <div className="d-md-flex d-sm-block align-items-center justify-content-between">
            <div className="offer-header">What we offer at reignboxes</div>
            <div className="arrows-direction-container">
              <div>
                <FiArrowLeft />
              </div>
              <div>
                <FiArrowRight />
              </div>
            </div>
          </div>

          <div className="what-we-offer-container mt-3">
            <div className="offer-items shadow-sm rounded">
              <div className="shadow-sm p-3 rounded-circle">
                <img src={bike} width={80} alt="delivery bike" />
              </div>
              <div>
                <div className="offer-items-header">Choose a product</div>
                <div className="offer-items-content">
                  Explore Vendors located anywhere within the school.
                </div>
              </div>
            </div>

            <div className="offer-items shadow-sm rounded">
              <div className="shadow-sm p-3 rounded-circle">
                <img src={Placeholder} width={80} alt="placeholder" />
              </div>
              <div>
                <div className="offer-items-header">Get it delivered</div>
                <div className="offer-items-content">
                  Your delivery will arrive promptly.
                </div>
              </div>
            </div>

            <div className="offer-items shadow-sm rounded">
              <div className="shadow-sm p-3 rounded-circle">
                <img src={shoppingcart} width={80} alt="shopping cart" />
              </div>
              <div>
                <div className="offer-items-header">Set Delivery Location</div>
                <div className="offer-items-content">
                  Specify the delivery destination for your product
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Banner */}
        <div className="banner">
          <div className="banner-container">
            <img
              src={pexels}
              alt="reignboxes banner"
              width="20%"
              height="30%"
            />
          </div>
        </div>

        {/* Feedback Section */}
        <FeedBack />

        {/* Categories */}
        <div className="Category">
          <div className="category-head-container">
            <div className="categories_Subhead">categories</div>
            <div className="category-head text-center mt-3">
              Browse by Category
            </div>
          </div>

          <div className="category_container">
            {[
              { img: pasta, name: "Food" },
              { img: Drinks, name: "Soft Drinks" },
              { img: junk, name: "Junks" },
              { img: pastry, name: "Pastries" },
            ].map((cat, index) => (
              <div key={index} className="category_item shadow-sm p-2 rounded">
                <div className="category-image">
                  <img src={cat.img} alt={cat.name} width={70} />
                </div>
                <div className="category-content">{cat.name}</div>
              </div>
            ))}
          </div>
        </div>

       <div
  style={{
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: "2rem",
    gap: "2rem",
  }}
>
  {/* Left - First Product */}
  <div
    style={{
      flex: "1",
      minWidth: "300px",
      backgroundColor: "#f9f9f9",
      padding: "1.5rem",
      borderRadius: "12px",
      animation: "fadeInUp 0.6s ease-in-out",
    }}
  >
    <h1
      style={{
        fontSize: "1.5rem",
        color: "#333",
        marginBottom: "1rem",
        textTransform: "capitalize",
      }}
    >
      First Product
    </h1>
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "1rem",
      }}
    >
      {product.slice(0, 5).map((item) => (
        <div
          key={item.id}
          style={{
            background: "#fff",
            borderRadius: "10px",
            boxShadow: "0 6px 12px rgba(0,0,0,0.08)",
            padding: "1rem",
            width: "180px",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-5px)";
            e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.12)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 6px 12px rgba(0,0,0,0.08)";
          }}
        >
          <Items
            Pname={item.Pname}
            price={item.price}
            category={item.category}
            image={item.image}
            id={item.id}
            availability={item.availability}
          />
        </div>
      ))}
    </div>
  </div>

  {/* Right - Second Product */}
  <div
    style={{
      flex: "1",
      minWidth: "300px",
      backgroundColor: "#f1f1f1",
      padding: "1.5rem",
      borderRadius: "12px",
      animation: "fadeInUp 0.6s ease-in-out",
    }}
  >
    <h1
      style={{
        fontSize: "1.5rem",
        color: "#333",
        marginBottom: "1rem",
        textTransform: "capitalize",
      }}
    >
      Second Product
    </h1>
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "1rem",
      }}
    >
      {product
        .slice(0, 5)
        .reverse()
        .map((item) => (
          <div
            key={item.id}
            style={{
              background: "#fff",
              borderRadius: "10px",
              boxShadow: "0 6px 12px rgba(0,0,0,0.08)",
              padding: "1rem",
              width: "180px",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow =
                "0 10px 20px rgba(0,0,0,0.12)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 6px 12px rgba(0,0,0,0.08)";
            }}
          >
            <Items
              Pname={item.Pname}
              price={item.price}
              category={item.category}
              image={item.image}
              id={item.id}
              availability={item.availability}
            />
          </div>
        ))}
    </div>
  </div>
</div>



        {/* Vendor List */}
        <div>
          <div className="vendor_head_container">
            <div className="vendor-sub_head">Choose desired vendor</div>
            <div className="Vendor-head text-center my-3">
              😍 Explore Vendors
            </div>
          </div>

          <div className="vendor-list-container">
            {currentVendors.map((item, index) => (
              <div
                key={index}
                className="vendor-items shadow-sm"
                onClick={() => {
                  window.scrollTo(0, 0);
                  navigate(`/${item.name}`);
                }}
              >
                <img src={item.Image} alt={item.name} />
                <div className="vendor-contents">
                  <div>
                    <FaStore className="me-1" />
                    {item.name}
                  </div>
                  <div className="d-flex justify-content-between">
                    <div className="d-flex align-items-center gap-1">
                      <TbMotorbike size={18} />
                      <TbCurrencyNaira size={18} />
                      <span>|</span>
                      <span>10-30min</span>
                    </div>
                    <div className="d-flex align-items-center">
                      <FaStar color="orange" className="mx-1" />5
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="pagination-container mb-5">
            {pageNumbers.map((number) => (
              <div
                key={number}
                className={`page-item ${
                  number === currentPage ? "active" : ""
                }`}
                onClick={() => setCurrentPage(number)}
              >
                {number}
              </div>
            ))}
          </div>
        </div>

        {/* Modal */}
        <div className={modalIsOpen ? "modal-body-Active" : "modal-body"}>
          <div className="modal-container shadow">
            <div className="d-flex align-items-center justify-content-between">
              <div className="modal-header">Announcement!!</div>
              <div
                className="back"
                onClick={() => {
                  setModalIsOpen(false);
                  localStorage.removeItem("modalShown");
                }}
              >
                <IoMdClose size={24} />
              </div>
            </div>
            <hr />
            {loader ? (
              <div className="text-center mt-4">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <div className="modal-content">
                {modal.length > 0 ? (
                  modal.map((item, index) => (
                    <div key={index}>
                      <p>{item.note}</p>
                    </div>
                  ))
                ) : (
                  <p>No announcements available.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
