import React, { useContext, useEffect, useState } from "react";
import "./Trending.css";
import { FaHeart, FaPlusCircle, FaStar } from "react-icons/fa";
import { ContextApi } from "../ShopContext/ShopContext";
import { IoClose } from "react-icons/io5";
import { TbCurrencyNaira } from "react-icons/tb";
import { FaMinus, FaPlus } from "react-icons/fa6";
import all_product from "../All_Product/all_product";
import { CiHeart } from "react-icons/ci";
import { io } from "socket.io-client";
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";
import { VscChromeClose } from "react-icons/vsc";
import { LuPlus } from "react-icons/lu";
import { FiMinus } from "react-icons/fi";
import { TiHeartOutline } from "react-icons/ti";
import { RiShoppingCartLine } from "react-icons/ri";

const Trending = ({ Store }) => {
  const [all_product, setProduct] = useState([]);
  const trendingProduct = all_product.filter((item) => item.vendor === Store);
  const [loader, SetLoader] = useState(false);
  const getAllProduct = async () => {
    try {
      SetLoader(true);
      const response = await axios.get(
        `https://server-ten-gilt.vercel.app/getalProducts`
      );
      if (response) {
        setProduct(response.data.response);
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
      setProduct((prevProducts) => [...prevProducts, newProduct]);
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
  }, [Store]);
  const { addToCart, cartItms, Remove, WishList, addtowishList, RemoveList } =
    useContext(ContextApi);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const [quantity, setQuantity] = useState(1); // New state for quantity counter

  //wish List toggle
  const toggleWhishList = (itemId) => {
    if (!itemId) {
      console.error("Invalid itemId in toggleWhishList:", itemId);
      return;
    }

    if (WishList[itemId] > 0) {
      RemoveList(itemId);
    } else {
      addtowishList(itemId);
    }
  };

  const openCart = (product) => {
    setSelectedProduct(product);
    setShowSuccess(false);
    setQuantity(cartItms[product.id] || 1); // Preserve existing quantity in cart
  };

  const closeCart = () => {
    setSelectedProduct(null);
  };

  const cartAdded = (id) => {
    setShowSuccess(true);

    const prevQuantity = cartItms[id] || 0; // Get the previous quantity in cart
    const newItemsToAdd = quantity - prevQuantity; // Add only the difference

    if (newItemsToAdd > 0) {
      for (let i = 0; i < newItemsToAdd; i++) {
        addToCart(id);
      }
    }

    setTimeout(() => {
      closeCart();
      setShowSuccess(false);
    }, 500);
  };
  const trending = trendingProduct.filter((item) => item.category === "pack");

  const settings = {
    dots: true,
    infinite: trending.length > 5, // Ensure it only loops if enough items
    speed: 500,
    slidesToShow: trending.length >= 5 ? 5 : trending.length, // Ensure enough slides
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    pauseOnFocus: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: trending.length >= 3 ? 3 : trending.length,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 760,
        settings: {
          slidesToShow: trending.length >= 2 ? 2 : trending.length,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <ToastContainer />

      {selectedProduct && (
        <div className={`overlay ${selectedProduct ? "overlaydisplay" : ""}`}>
          <div className="cancelBody" onClick={closeCart}>
            <VscChromeClose className="cancel mb-2" />
          </div>
          <div className="overlay-body">
            <div className="single-image-body">
              <img src={selectedProduct.image} alt={selectedProduct.Pname} />
            </div>
            <div>
              <div className="single-name">{selectedProduct.Pname}</div>
              <div className="single-category">{selectedProduct.category}</div>
              <div className="single-price">
                <TbCurrencyNaira />
                {selectedProduct.price}
              </div>
              <div className="mt-2">
                <div
                  className={
                    selectedProduct.availability === "inStock"
                      ? "type1"
                      : "type2"
                  }
                >
                  {selectedProduct.availability === "inStock"
                    ? "IN STOCK"
                    : "OUT OF STOCK"}
                </div>
              </div>

              <div className="bottom">
                <div className="single-quantity-btn">
                  <button
                    className="single-increment"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <LuPlus />
                  </button>
                  <div className="count">{quantity}</div>
                  <button
                    className="single-Decrement"
                    onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                  >
                    <FiMinus />
                  </button>
                </div>
                <div
                  className={` shadow-sm ${
                    WishList[selectedProduct.id] > 0
                      ? "single-wishList"
                      : "single-wishList-none"
                  }`}
                  onClick={() => toggleWhishList(selectedProduct.id)}
                >
                  <TiHeartOutline className="mb-1 me-1" />
                  Add to wishlist
                </div>
                <div
                  className="single-button shadow-sm"
                  onClick={() => cartAdded(selectedProduct.id)}
                >
                  <RiShoppingCartLine className="mb-1 me-1" />
                  Add to cart
                </div>
                <div className="single-total">
                  <div>Total : </div>
                  <div>
                    <TbCurrencyNaira />
                    {Math.ceil(
                      selectedProduct.price * cartItms[selectedProduct.id]
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {loader ? (
        <div className="d-flex justify-content-center mt-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="trend">
          <div className="trending-cont">
            <Slider {...settings}>
              {trending.map((item, index) => (
                <div className="product-item">
                  <div
                    className="product-image"
                    onClick={() => {
                      // window.scroll(0, 0);
                      // navigate("/SingleProduct", {
                      //   state: {
                      //     image: product?.image,
                      //     name: product.name,
                      //     category: product.category,
                      //     newPrice: product.newPrice,
                      //     oldPrice: product.oldPrice,
                      //     id: product.id,
                      //     start: product.start,
                      //   },
                      // });
                    }}
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    <img
                      src={
                        item.image ||
                        "https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-image-vector-illustration-isolated-png-image_1694547.jpg"
                      }
                      alt={item.Pname}
                      onError={(e) =>
                        (e.target.src =
                          "https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-image-vector-illustration-isolated-png-image_1694547.jpg")
                      }
                    />
                  </div>
                  <div className="product-info">
                    <div className="category">{item.category}</div>
                    <div className="name">{item.Pname.slice(0, 10)}...</div>
                    <div style={{ display: "flex", marginTop: 10 }}></div>

                    <div className="d-flex gap-2 align-items-center">
                      <div className="new-price">
                        <TbCurrencyNaira />
                        {item.price}
                      </div>
                    </div>
                    <div
                      className={
                        item.availability === "inStock" ? "type1" : "type2"
                      }
                    >
                      {item.availability === "inStock"
                        ? "IN STOCK"
                        : "OUT OF STOCK"}
                    </div>
                  </div>
                  <div className="hover-buttons">
                    <button
                      className="buy-btn shadow-sm"
                      onClick={() => {
                        addToCart(item.id);
                      }}
                    >
                      {cartItms[item.id] > 0 ? (
                        <img
                          width="15"
                          height="15"
                          src="https://img.icons8.com/emoji/50/check-mark-emoji.png"
                          alt="check-mark-emoji"
                        />
                      ) : (
                        <img
                          width="15"
                          height="15"
                          src="https://img.icons8.com/fluency-systems-regular/50/shopping-bag.png"
                          alt="shopping-bag"
                        />
                      )}
                    </button>
                    <button
                      className="cart-btn shadow-sm"
                      onClick={() => {
                        toggleWhishList(item.id);
                        const Toast = Swal.mixin({
                          toast: true,
                          position: "top-end",
                          showConfirmButton: false,
                          timer: 3000,
                          timerProgressBar: true,
                          didOpen: (toast) => {
                            toast.onmouseenter = Swal.stopTimer;
                            toast.onmouseleave = Swal.resumeTimer;
                          },
                        });
                        Toast.fire({
                          icon: "success",
                          title: "product added wishList",
                        });
                      }} // Pass a function reference
                    >
                      {WishList[item.id] > 0 ? (
                        <img
                          width="15"
                          height="15"
                          src="https://img.icons8.com/fluency/48/filled-like--v1.png"
                          alt="filled-like--v1"
                        />
                      ) : (
                        <img
                          width="15"
                          height="15"
                          src="https://img.icons8.com/ios/50/like--v1.png"
                          alt="like--v1"
                        />
                      )}
                    </button>
                    <button
                      onClick={() =>
                        openCart({
                          Pname: item.Pname,
                          price: item.price,
                          image: item.image,
                          category: item.category,
                          availability: item.availability,
                          id: item.id,
                        })
                      }
                      className="wishlist-btn shadow-sm"
                    >
                      <img
                        width="14"
                        height="14"
                        src="https://img.icons8.com/external-line-icons-royyan-wijaya/64/external-eyes-medical-stuff-line-icons-royyan-wijaya.png"
                        alt="external-eyes-medical-stuff-line-icons-royyan-wijaya"
                      />
                    </button>
                  </div>
                  <div className="px-3">
                    <button
                      className="add-cart-item shadow-sm"
                      onClick={() => addToCart(item.id)}
                    >
                      {cartItms[item.id] > 0 ? "Item In Cart" : "Add To Cart"}
                    </button>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      )}
    </>
  );
};

export default Trending;
