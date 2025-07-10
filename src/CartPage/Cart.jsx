import React, { useContext, useEffect, useState } from "react";
import "./Cart.css";
import { FaArrowLeftLong, FaMinus, FaPlus } from "react-icons/fa6";
import Nav from "../Nav/Nav";
import { ContextApi } from "../ShopContext/ShopContext";
import { FiTrash2 } from "react-icons/fi";
import { TbCurrencyNaira } from "react-icons/tb";
import img from "../assets/no-product.png";
import axios from "axios";
import swal from "sweetalert";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
function Cart() {
  const Navigate = useNavigate();
  const [all_product, setProduct] = useState([]);
  const [loader, SetLoader] = useState(false);
  console.log(all_product);

  // State for delivery fee and vendor
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [uniqueVendor, setUniqueVendor] = useState(null);

  const { cartItms, addToCart, Remove, deleteCart, getTotalValue } =
    useContext(ContextApi);

  const [packselect, setPack] = useState("none");
  const [price, setPrice] = useState(0);

  //checkbox
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  // Fetch all products
  const getAllProduct = async () => {
    try {
      SetLoader(true);
      const response = await axios.get(`https://server-ten-gilt.vercel.app/getalProducts`);
      if (response) {
        setProduct(response.data.response);
      }
    } catch (error) {
      console.log(error);
    } finally {
      SetLoader(false);
    }
  };

  // Fetch delivery fee based on vendor
  const getDeliveryFee = async (vendor) => {
    try {
      const response = await axios.get("https://msback.onrender.com/AllPrice");
      const feeData = response.data.message;
      const filterFee = feeData.find((item) => item.vendor === vendor);
      if (filterFee) {
        setDeliveryFee(filterFee.DeliveryFee);
      } else {
        setDeliveryFee(0); // Default fee if not found
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  // Compute cart products
  const cartProducts = all_product.filter((itm) => cartItms[itm.id] > 0);

  // Compute unique vendor whenever cartProducts change
  useEffect(() => {
    const vendors = cartProducts.map((product) => product.vendor);
    const uniqueVendors = [...new Set(vendors)];
    if (uniqueVendors.length === 1) {
      setUniqueVendor(uniqueVendors[0]);
      getDeliveryFee(uniqueVendors[0]);
    } else {
      setUniqueVendor(null);
      setDeliveryFee(0);
    }
  }, [cartProducts]);

  // Update price based on selected size
  const handleSelect = (e) => {
    const size = e.target.value;
    setPack(size);
    if (size === "Small") {
      setPrice(100);
    } else if (size === "Big") {
      setPrice(200);
    } else if (size === "none") {
      setPrice(0);
    }
  };

  // Calculate service fee
  const totalFee = getTotalValue() + Number(price);
  const serviceFee = (() => {
    if (totalFee <= 600) return 0.25 * totalFee;
    else if (totalFee <= 1000) return 0.15 * totalFee;
    else if (totalFee <= 2000) return totalFee * 0.1;
    return totalFee * 0.05;
  })();
  const total =
    (isChecked ? 0 : Number(deliveryFee || 0)) +
    Math.floor(serviceFee || 0) +
    (price || 0) +
    Math.floor(getTotalValue() || 0);

  let today = new Date();
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

  const CheckOut = () => {
    if (uniqueVendor) {
      // Proceed to the payment page if there is only one vendor
      Navigate("/Order_payment", {
        state: {
          receiptID: Date.now(),
          PackPrice: price,
          total: total,
          cartItem: cartProducts,
          serviceFee: serviceFee,
          deliveryFee: deliveryFee,
          vendor: uniqueVendor,
          checked: isChecked,
        },
      });
    } else {
      // Show error message for multiple vendors
      swal({
        title: "Error!",
        text: "You have items from multiple vendors in your cart. Please checkout items from only one vendor at a time.",
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
    }
  };
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setModalIsOpen(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  const modlalcontent =
    "please remember to add a pack if you're ordering an eatable food item . Also take a screenshot of your order confirmation page before checking out for future reference .Thank you!";
  return (
    <div>
      <Nav />
      <div className="pageBody">
        <div className="">
          <div className="bread-crumbs">
            <div className="bread-crumbs-container">
              <div className="Bread-crumbs-Header">Cart</div>
              <div className="d-flex gap-1 breadCrumb-content">
                <div
                  onClick={() => Navigate("/store")}
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
                <span>cart</span>
              </div>
            </div>
          </div>
          <div className="px-5 pt-3">
            <div>
              {/* <br />
              <select
                name="packSize"
                className="form-select w-50 mt-4"
                value={packselect}
                onChange={handleSelect}
              >
                <option value="none">None</option>
                <option value="Small">Small</option>
                <option value="Big">Big</option>
              </select> */}
            </div>
          </div>
        </div>
        {loader ? (
          <div className="d-flex justify-content-center mt-5">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : cartProducts.length > 0 ? (
          <div className="cart-container">
            <div className="row w-100">
              <div className="col-md-4 col-sm-12">
                <div className="cart-summary">
                  <div className="cart-summary-header">Summary</div>
                  <div className="cart-summary-header2">Estimated delivery</div>
                  <div className="cart-summary-content">
                    Enter your destination to get a delivery estimate
                  </div>

                  <div className="sum mt-2">
                    <div>
                      <div>Recipt ID</div>
                      <div>#{Date.now()}</div>
                    </div>
                    <div>
                      <div>pick up at store</div>
                      <div>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={handleCheckboxChange}
                        />
                      </div>
                    </div>
                    <div>
                      <div>Date</div>
                      <div>{date}</div>
                    </div>
                    <div>
                      <div>sub-total</div>
                      <div>
                        <TbCurrencyNaira />
                        {Math.floor(getTotalValue())}
                      </div>
                    </div>
                    <div>
                      <div>Delivery Fee</div>
                      <div>
                        <TbCurrencyNaira />
                        {isChecked ? 0 : deliveryFee}
                      </div>
                    </div>
                    <div>
                      <div>Service Fee</div>
                      <div>
                        {" "}
                        <TbCurrencyNaira />
                        {Math.floor(serviceFee)}
                      </div>
                    </div>
                    <div className="totalrecipt">
                      <div>Total</div>
                      <div>
                        <TbCurrencyNaira />
                        {total}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-8 col-sm-12 cart-cont">
                <table className="table4">
                  <tr className="table-header">
                    <td>Product</td>
                    <td>Price</td>
                    <td>quantity</td>
                    <td>Action</td>
                  </tr>
                  {cartProducts.map((e) => {
                    if (cartProducts.length > 0) {
                      return (
                        <tr>
                          <td>
                            <div className="d-flex gap-2 align-items-center">
                              <img
                                src={e.image}
                                alt=""
                                width={50}
                                height={50}
                              />
                              <div>{e.name}</div>
                            </div>
                          </td>
                          <td>
                            <TbCurrencyNaira />
                            {e.price}
                          </td>
                          <td>
                            <div className="counter-container">
                              <button onClick={() => addToCart(e.id)}>+</button>
                              <div>{cartItms[e.id]}</div>
                              <button
                                onClick={() => {
                                  Remove(e.id);
                                }}
                              >
                                -
                              </button>
                            </div>
                          </td>
                          <td>
                            <div
                              style={{
                                cursor: "pointer",
                              }}
                              onClick={() => {
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
                                  icon: "info",
                                  title: "product removed from cart",
                                });
                              }}
                            >
                              <img
                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEP0lEQVR4nO2dP4+UVRTGfxUR+AgsriFqpAQLxVbdGDtJSHQ/A1BCCTQutkK0kgIT+RckxsVC+AAmRreAEgtZ1kqjiK6R5jE3czBvNsPsfYedmXPPnl9yi52cmZznPe/cP8/c+y4kSZIkSZIkSZIkSZIkSZJER7BD8JHgF4E2aWuCpfKeWecdFsHZikJsbB/OOu+waHDXl4t8qCL2jSfflOlktw2R3fWTik+yID4Q7Bd8Xjk4a8qt5HSx5Mh2QPCu4G8HF16btJLjO0RGsFfwuwn+TLAPZwj2CS5YjiXXvURFcNWE3sA5gi8t16tERPBmpyuYxzmCOcEjy7ndrsuEXBP8+ZS++SSNIDjxFA1F23XBSzRQjN8cDMjapN3t5Hy3+1rn75pWtO7BK/bNKIl+7TrRZ6RoEyyb1it4pdNNhS3Ghhlj0foHXhE8tCTnCI4aKch1S3I5clE0GCtvmtZreEXwsuBXB4O2ptTKoP4iDQx4VzrdV8T20CYwvosxDMF9E/E8jSKYNw0/0zqCFRNzgEYRHDQNP9I6glsm5m0aRbBgGr6ldQSXTMwHNIpg0TR8QesIzpuYoz13lazZpoYds4rvvO+oaThP6whOm5jTFbFnbQ2zpzPXX5pV/Dga3CM4Vnt3aXDXzm1YDa/NKr4Td840HKN1ythhYi5VxKrmtWnFd2Ium4b3aZ0yuzIxtxwU5E6f+EgzxbHm8JrSHd83PsJa6n/KCt3E3G+4IKumof0ND4JdJmbdQZd1r098J2bdNOwiArWC5HBQF+yuvaHCGYxyOKj36XKboTMoHmxtDFEkY7HvtFE+CxLHWOxrMMpnl1W9sG2GWutBPgf145b7x0Sh1pyTz4KcsdxPEYVag1E+C1L980Ez1PbD8lmQOMZiX4NRPgty23J/iyh05vIrDRZkJYyx2He1K58FiWMsDjEY/2mwIOuW+04i0RG2u5WCKKKx2MdglL+CxNmxOI7BKH8FiWcsDjEYFxoqyEI4Y3GIwbjYUEEWw+xYHMdglL+CxDMW+xiM8leQeMZiH4NRW3OB72zh58fZsTjCYLw8yYKMYozPj2cs9jEY5a8g8YzFPgaj/BUknrE4xGBcbaggq+GMxT4Go/wVJKaxWGswytEsq88W2AgG47z3dYgiG4tPKCbdKINRvgryquX6A1HZzGCUr4LENRZrDUYNPwP4YMTnTSw+5I7FEXuchloRGjw8/6adkC0X65tRz26fZHyoo9AVBuOZEefIl+xOflAuVsW584nEhzoKvRVHpGdNyB2LGxEcMZHLOEeD50aWXI8QFcErnedNPYdTBDs7z4/0/SjYZ0XwvQn9BKcIPrUcvyM69o9WHpvgrwSvezjdqoFVcshyKrn9K3iN7YDgsOAvE+6xPRK8x3ZC8ILNZH7qfGM0w/bYcjnX8uMIkyRJkiRJkiRJkiRJkiRJkiRJkoQ+/AfNOoXNz7JA8QAAAABJRU5ErkJggg=="
                                alt="filled-trash"
                                width={30}
                                onClick={() => deleteCart(e.id)}
                                className="delete-icn"
                                height={30}
                              />
                            </div>
                          </td>
                        </tr>
                      );
                    }
                  })}
                </table>
                <div className="table-sm">
                  {cartProducts.map((e) => {
                    if (cartProducts.length > 0) {
                      return (
                        <div className="table-sm-container-itm">
                          <div className="table-cont-item">
                            <div>Product</div>
                            <div className="d-flex align-items-center gap-2">
                              <img width={50} src={e.image} alt="" />
                              <div>{e.name}</div>
                            </div>
                          </div>
                          <div className="table-cont-item">
                            <div>Price</div>
                            <div>
                              <div>
                                {" "}
                                <TbCurrencyNaira />
                                {e.price}
                              </div>
                            </div>
                          </div>
                          <div className="table-cont-item">
                            <div>Quantity</div>
                            <div>
                              <div>
                                <td>
                                  <div className="counter-container">
                                    <button
                                      type="button"
                                      onClick={() => addToCart(e.id)}
                                    >
                                      +
                                    </button>
                                    <div>{cartItms[e.id]}</div>
                                    <button
                                      type="button"
                                      onClick={() => Remove(e.id)}
                                    >
                                      -
                                    </button>
                                  </div>
                                </td>
                              </div>
                            </div>
                          </div>
                          <div className="table-cont-item">
                            <div>Remove</div>
                            <div>
                              <div>
                                <img
                                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEP0lEQVR4nO2dP4+UVRTGfxUR+AgsriFqpAQLxVbdGDtJSHQ/A1BCCTQutkK0kgIT+RckxsVC+AAmRreAEgtZ1kqjiK6R5jE3czBvNsPsfYedmXPPnl9yi52cmZznPe/cP8/c+y4kSZIkSZIkSZIkSZIkSZJER7BD8JHgF4E2aWuCpfKeWecdFsHZikJsbB/OOu+waHDXl4t8qCL2jSfflOlktw2R3fWTik+yID4Q7Bd8Xjk4a8qt5HSx5Mh2QPCu4G8HF16btJLjO0RGsFfwuwn+TLAPZwj2CS5YjiXXvURFcNWE3sA5gi8t16tERPBmpyuYxzmCOcEjy7ndrsuEXBP8+ZS++SSNIDjxFA1F23XBSzRQjN8cDMjapN3t5Hy3+1rn75pWtO7BK/bNKIl+7TrRZ6RoEyyb1it4pdNNhS3Ghhlj0foHXhE8tCTnCI4aKch1S3I5clE0GCtvmtZreEXwsuBXB4O2ptTKoP4iDQx4VzrdV8T20CYwvosxDMF9E/E8jSKYNw0/0zqCFRNzgEYRHDQNP9I6glsm5m0aRbBgGr6ldQSXTMwHNIpg0TR8QesIzpuYoz13lazZpoYds4rvvO+oaThP6whOm5jTFbFnbQ2zpzPXX5pV/Dga3CM4Vnt3aXDXzm1YDa/NKr4Td840HKN1ythhYi5VxKrmtWnFd2Ium4b3aZ0yuzIxtxwU5E6f+EgzxbHm8JrSHd83PsJa6n/KCt3E3G+4IKumof0ND4JdJmbdQZd1r098J2bdNOwiArWC5HBQF+yuvaHCGYxyOKj36XKboTMoHmxtDFEkY7HvtFE+CxLHWOxrMMpnl1W9sG2GWutBPgf145b7x0Sh1pyTz4KcsdxPEYVag1E+C1L980Ez1PbD8lmQOMZiX4NRPgty23J/iyh05vIrDRZkJYyx2He1K58FiWMsDjEY/2mwIOuW+04i0RG2u5WCKKKx2MdglL+CxNmxOI7BKH8FiWcsDjEYFxoqyEI4Y3GIwbjYUEEWw+xYHMdglL+CxDMW+xiM8leQeMZiH4NRW3OB72zh58fZsTjCYLw8yYKMYozPj2cs9jEY5a8g8YzFPgaj/BUknrE4xGBcbaggq+GMxT4Go/wVJKaxWGswytEsq88W2AgG47z3dYgiG4tPKCbdKINRvgryquX6A1HZzGCUr4LENRZrDUYNPwP4YMTnTSw+5I7FEXuchloRGjw8/6adkC0X65tRz26fZHyoo9AVBuOZEefIl+xOflAuVsW584nEhzoKvRVHpGdNyB2LGxEcMZHLOEeD50aWXI8QFcErnedNPYdTBDs7z4/0/SjYZ0XwvQn9BKcIPrUcvyM69o9WHpvgrwSvezjdqoFVcshyKrn9K3iN7YDgsOAvE+6xPRK8x3ZC8ILNZH7qfGM0w/bYcjnX8uMIkyRJkiRJkiRJkiRJkiRJkiRJkoQ+/AfNOoXNz7JA8QAAAABJRU5ErkJggg=="
                                  alt="filled-trash"
                                  width={25}
                                  onClick={() => deleteCart(e.id)}
                                  className="delete-icn"
                                  height={25}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
              <div className="buttons">
                <Link
                  onClick={() => {
                    Navigate(-1);
                    window.scrollTo(0, 0);
                  }}
                  className="continue"
                >
                  continue shopping
                </Link>
                <button onClick={CheckOut}>CheckOut</button>
              </div>
            </div>
          </div>
        ) : (
          <div className="no-product-cont">
            <div className="no-product">
              <img
                src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png"
                alt="package"
              />
            </div>
          </div>
        )}
      </div>
      {/* Modal */}
      <div className={modalIsOpen ? "modal-body-Active" : "modal-body"}>
        <div className="modal-container shadow">
          <div className="d-flex align-items-center justify-content-between">
            <div className="modal-header">Note!!</div>
            <div
              className="back"
              onClick={() => {
                setModalIsOpen(false);
                localStorage.clear("modalShown");
              }}
            >
              <IoMdClose size={24} />
            </div>
          </div>
          <hr />
          {loader ? (
            <div className="text-center mt-4">
              <div className="spinner-border spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="modal-content">{modlalcontent}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
