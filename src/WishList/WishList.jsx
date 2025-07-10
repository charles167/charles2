import React, { useContext, useEffect, useState } from "react";
import "./WishList.css";
import { ContextApi } from "../ShopContext/ShopContext";
import { FiTrash2 } from "react-icons/fi";
import { FaArrowLeftLong, FaPlus } from "react-icons/fa6";
import Nav from "../Nav/Nav";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
function WishList() {
  const [loader, SetLoader] = useState(false);
  const { WishList, totalWishList, RemoveList } = useContext(ContextApi);
  const [all_product, setProduct] = useState([]);
  const getALlProduct = async () => {
    try {
      SetLoader(true);
      const response = await axios.get(
        `https://server-ten-gilt.vercel.app/getalProducts`
      );
      if (response) {
        setProduct(response.data.response);
      }
    } catch (error) {
      console.log(error);
    } finally {
      SetLoader(false);
    }
  };
  useEffect(() => {
    getALlProduct();
  }, []);
  return (
    <div>
      <Nav />
      <div className="WishList-body p-md-3 p-sm-1">
        {loader ? (
          <div className="d-flex justify-content-center mt-5">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            <div className="d-flex align-items-center justify-content-between">
              <div
                className="back ms-3"
                onClick={() => {
                  window.history.back();
                }}
              >
                <MdKeyboardArrowLeft size={30} />
              </div>

              <div className=" wishlist-head ">My WishList</div>
              <div className="fw-bold fs-2 ps-4"></div>
            </div>
            <div className="wishListAmount">
              There are <span className="text-success">{totalWishList()}</span>{" "}
              items in the wishlist
            </div>
            <div className="Whilst_container ">
              {all_product.map((product) => {
                if (WishList[product.id] > 0) {
                  return (
                    <>
                      <div className="mt-4 d-flex align-items-center shadow-sm p-3 rounded justify-content-between">
                        <div className="d-flex gap-2 w-sm-75 w-md-50 ">
                          <div>
                            <img src={product.image} width={40} alt="" />
                          </div>
                          <div className="mx-4">
                            <div className="title">{product.Pname}</div>
                            <div className="category"> {product.category}</div>
                          </div>
                        </div>

                        <div className="mt-3 d-flex gap-5">
                          <div></div>
                          <div>
                            <div
                              className="text-success delete"
                              onClick={() => {
                                toast.warning(
                                  `${product.Pname} deleted from wishlist`
                                );
                                RemoveList(product.id);
                              }}
                            >
                              <FiTrash2 color="red" />
                            </div>
                            <div className="Old_price">{product.price}</div>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                } else {
                  <p>wishlist is empty</p>;
                }
              })}
            </div>
          </>
        )}

        <ToastContainer />
      </div>
    </div>
  );
}

export default WishList;
