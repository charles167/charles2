import React, { useContext, useEffect, useState } from "react";
import Nav from "../Nav/Nav";
import "./ProductStore.css";
import { RiArrowRightSLine } from "react-icons/ri";
import axios from "axios";
import Items from "../Items/Items";
import Trending from "../Trending/Trending";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { FaPlusCircle } from "react-icons/fa";
import { TbCurrencyNaira } from "react-icons/tb";
import { IoAdd } from "react-icons/io5";
import { ContextApi } from "../ShopContext/ShopContext";
import Footer from "../footer/Footer";
import BackToTop from "../BackToTop/BackToTop";
import Slider from "react-slick";
import Vendors from "../Vendors/Vendors";
const ProductStore = ({ Store }) => {
  const { addToCart, cartItms } = useContext(ContextApi);
  const [category, setCategory] = useState("All");
  const [loader, SetLoader] = useState(false);
  const [product, setProduct] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Page state
  const productPerPage = 10; // Set how many products per page
  const [input, setInput] = useState("");
  const [productSearch, setProductSearch] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch all products
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

    const socket = io("https://server-ten-gilt.vercel.app/");

    // Listen for real-time updates (product added or deleted)
    socket.on("productAdded", (newProduct) => {
      if (newProduct.vendor === Store) {
        if (category === "All" || newProduct.category === category) {
          setProduct((prevProducts) => [...prevProducts, newProduct]);
        }
      }
    });

    socket.on("productDelete", (deletedProductId) => {
      setProduct((prevProducts) =>
        prevProducts.filter((product) => product._id !== deletedProductId)
      );
    });
    socket.on("ProductUpdated", (updatedProduct) => {
      setProduct((prevProducts) =>
        prevProducts.map((product) =>
          product._id === updatedProduct._id ? updatedProduct : product
        )
      );
    });

    return () => {
      socket.disconnect();
    };
  }, [category, Store]);

  // Pagination and Filter Logic
  const filteredProducts = product
    .filter((item) =>
      category === "All"
        ? item.vendor === Store
        : item.vendor === Store && item.category === category
    )
    .sort((a, b) => a.Pname.localeCompare(b.Pname)); // Sorting before pagination

  // Reset page to 1 when category or store changes
  useEffect(() => {
    setCurrentPage(1);
  }, [category, Store]);

  // Calculate total products for current page
  const indexOfLastProduct = currentPage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;
  const currentProduct = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber); // Change page
  };

  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(filteredProducts.length / productPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
    ],
  };
  return (
    <div>
      <Nav />
      <div className="Body">
        <div className="breadcrumb-container">
          <div className="bread-crumbs_content">
            <div className="Description">
              {" "}
              What would you like
              <div className="description-other-text">to order</div>{" "}
            </div>
            <div style={{ fontSize: 16, fontWeight: "500" }}>
              <Link to="/store" className="BreadCrumbs-item-link">
                Home
              </Link>{" "}
              <RiArrowRightSLine /> Vendors <RiArrowRightSLine /> {Store}
            </div>
          </div>
        </div>
        <div className="explore">
          <div className="explore-header">🎉Explore Popular Product</div>
          <div
            className="product_search shadow-sm"
            onClick={() => {
              setProductSearch(true);
              setInput("");
            }}
          >
            <FiSearch className="ProdctSearch_icn" />
          </div>
        </div>
        {productSearch ? (
          <div className="Search-container-product shadow-sm">
            {loader ? (
              <div className="d-flex justify-content-center mt-5">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <div>
                <div className="product-search-searc">
                  <div
                    className="back mt-3"
                    onClick={() => setProductSearch(false)}
                  >
                    <MdKeyboardArrowLeft size={30} />
                  </div>
                  <div>
                    <input
                      type="text"
                      className="product-search-search-input "
                      placeholder="search something ..."
                      onChange={(e) => setInput(e.target.value)}
                    />
                  </div>
                </div>
                <div className="p-3 ">
                  {product.filter(
                    (item) =>
                      item.vendor === Store &&
                      (input === "" ||
                        item.Pname.toLowerCase().includes(input.toLowerCase()))
                  ).length === 0 ? (
                    <p className="text-center">No product found : "{input}"</p>
                  ) : (
                    product
                      .filter(
                        (item) =>
                          item.vendor === Store &&
                          (input === "" ||
                            item.Pname.toLowerCase().includes(
                              input.toLowerCase()
                            ))
                      )
                      .map((item) => {
                        return (
                          <div className="d-flex align-items-center justify-content-between mb-5 mt-3">
                            <div className="d-flex align-items-center gap-3">
                              <img
                                src={item.image}
                                width={60}
                                className="rounded-circle"
                                height={60}
                              />
                              <div>
                                <div className="product-name">{item.Pname}</div>
                                <div className="price">
                                  <TbCurrencyNaira /> {item.price}
                                </div>
                              </div>
                            </div>
                            {item.availability === "inStock" ? (
                              <div className="buttons">
                                {cartItms[item.id] > 0 ? (
                                  <button className="incart">in cart</button>
                                ) : (
                                  <button
                                    className="addCart"
                                    onClick={() => addToCart(item.id)}
                                  >
                                    <IoAdd />
                                    add
                                  </button>
                                )}
                              </div>
                            ) : (
                              <div className="out-of-stock">out of stock</div>
                            )}
                          </div>
                        );
                      })
                  )}
                </div>
              </div>
            )}
          </div>
        ) : null}
        <Trending Store={Store} />
        <div className="category-type-container">
          <div style={{ position: "relative" }}>
            <div className="Product_SUbhead text-center">
              {Store} {""} product
            </div>
            <div className="Our-Product-head">Our Product</div>
          </div>

          <div className="type">
            <div className="category-type my-3">
              <Slider {...settings}>
                <div
                  className={
                    category === "All"
                      ? "category-type-item-active"
                      : "category-type-item"
                  }
                  onClick={() => setCategory("All")}
                >
                  All
                </div>
                {Vendors.filter((item) => item.name === Store)
                  .flatMap((item) => item.categories) // get the categories array directly
                  .map((categoryItem, index) => (
                    <div
                      key={index}
                      className={
                        category === categoryItem
                          ? "category-type-item-active"
                          : "category-type-item"
                      }
                      onClick={() => setCategory(categoryItem)}
                    >
                      {categoryItem}
                    </div>
                  ))}
              </Slider>
            </div>
          </div>
        </div>
        {/* sort by  */}

        {loader ? (
          <div className="d-flex justify-content-center mt-5">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="products">
            <div className="itemBody1">
              {currentProduct.length === 0 ? (
                <>No product found</>
              ) : (
                currentProduct.map((item) => (
                  <Items
                    key={item.id}
                    Pname={item.Pname}
                    price={item.price}
                    category={item.category}
                    image={item.image}
                    id={item.id}
                    availability={item.availability}
                  />
                ))
              )}
            </div>

            {/* Pagination Controls */}
            <div className="pagination-container">
              {pageNumbers.map((number) => (
                <div
                  key={number}
                  className={`page-item ${
                    number === currentPage ? "active" : ""
                  }`}
                  onClick={() => paginate(number)}
                >
                  {number}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <BackToTop />
      <Footer />
    </div>
  );
};

export default ProductStore;
