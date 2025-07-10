import React, { useEffect, useState } from "react";
import "./VendorPage.css";
import { IoIosArrowForward, IoIosTimer, IoMdHome } from "react-icons/io";
import { MdDateRange } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { FaEye, FaPlus } from "react-icons/fa";
import axios from "axios";
import { RiDeleteBack2Line } from "react-icons/ri";
import { FaTrash } from "react-icons/fa6";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
const VendorPage = ({ Store }) => {
  //category state
  const [category, setCategory] = useState("All");
  //collection state
  const [collection, SetCollection] = useState([]);
  //loader State
  const [loading, SetLoader] = useState(false);
  //date state
  const [currentDate, setCurrentDate] = useState("");
  //search state
  const [search, setSearch] = useState("");
  //time state
  const [currentTime, setCurrentTime] = useState("");
  //date function
  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setCurrentDate(formattedDate);
  }, []); // Empty dependency array ensures this runs only once on component mount
  //time function
  //function to fetch collection data
  const getALlProduct = async () => {
    try {
      SetLoader(true);
      const response = await axios.get(
        `https://server-ten-gilt.vercel.app/getalProducts`
      );
      console.log(response);
      if (response) {
        SetCollection(response.data.response);
        toast.success("data fetched successfully");
      } else {
        toast.error("issues fetching data");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      SetLoader(false);
    }
  };
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setCurrentTime(formattedTime);
    };

    // Update time every second
    const timer = setInterval(updateTime, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(timer);
  }, []);
  //useEffect funtion for fetching APi
  useEffect(() => {
    getALlProduct();
  }, []);
  //delete product function
  const handleDelete = async (id) => {
    SetLoader(true);
    try {
      const response = await axios.delete(
        `https://server-ten-gilt.vercel.app/delete/${id}`
      );
      if (response) {
        // Filter out the deleted item from the collection
        SetCollection((prevCollection) =>
          prevCollection.filter((item) => item._id !== id)
        );
        toast.success("Product deleted successfully");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      SetLoader(false);
    }
  };
  //search function
  const SearchProduct = (e) => {
    setSearch(e.target.value);
  };
  //search functionality
  const StoreProduct = collection.filter((item) => item.vendor === Store);
  const filteredProducts = StoreProduct.filter((item) => {
    if (search === "") {
      return item;
    } else if (item.Pname.toLowerCase().includes(search.toLowerCase())) {
      return item;
    }
  });
  return (
    <div>
      {/* collection body */}
      <div className="body">
        {/* collection head */}
        <div className="collection-header ps-4 pt-3">
          <span>Collection</span>
          <span style={{ color: "#787878" }}>{StoreProduct.length}</span>
        </div>
        {/* bread crumbs */}
        <div
          style={{
            display: "flex",
            gap: 1,
            alignItems: "center",
            marginTop: 20,
            paddingLeft: 20,
          }}
        >
          <IoMdHome color="#787878" />
          <div>
            <IoIosArrowForward />
          </div>
          <div
            style={{
              color: "#787878",
              fontWeight: "bold",
            }}
          >
            vendor
          </div>
          <div>
            <IoIosArrowForward />
          </div>
          <div
            style={{
              color: "#787878",
              fontWeight: "bold",
            }}
          >
            {Store}
          </div>
          <div>
            <IoIosArrowForward />
          </div>
          <div
            style={{
              fontWeight: "bold",
            }}
          >
            Collection
          </div>
        </div>
        {/* bread crumb end */}
        {/* second bread crumb */}
        <div className="p-4 d-md-flex d-sm-block justify-content-between">
          <div className="d-md-flex d-sm-block  gap-3">
            <div className=" d-flex h-50 mt-2 gap-2">
              <div
                style={{
                  fontWeight: "bold",
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                Show {""}{" "}
              </div>
              <div className="shadow-sm px-5 text-center bg-light rounded ">
                30
              </div>
            </div>
            <div className="shadow-sm  mt-2 h-50 bg-light rounded p-1">
              <MdDateRange className="mx-1" />
              {""}
              {""}
              {currentDate}
            </div>
            <div className="shadow-sm mt-2 h-50 bg-light rounded p-1">
              <IoIosTimer className="mx-1" />
              {""}
              {""}
              {currentTime}
            </div>
          </div>
          {/* search function */}
          <div className="d-flex gap-2 mt-3 ">
            <div className="search-container rounded bg-light shadow-sm p-2 w-100">
              <div className="search d-flex align-items-center">
                <FiSearch className="mx-2" />
                <input
                  type="text"
                  className="bg-light"
                  placeholder="Search product"
                  onChange={SearchProduct}
                />
              </div>
            </div>
            <Link
              to={`/Product-form/${Store}`}
              className="btn btn-primary rounded-circle p-2 add"
            >
              <FaPlus size={30} color="white" />
            </Link>
          </div>
        </div>
        {/* log out  */}
        <button
          className="btn btn-danger mx-3"
          onClick={() => {
            window.location.replace("/");
          }}
        >
          Log Out
        </button>
        {/* collectionBody */}
        {loading ? (
          <div className="d-flex justify-content-center mt-5">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            <div className="category-type2 my-3 ms-5">
              <div
                className={
                  category === "All"
                    ? "category-type-item-active2"
                    : "category-type-item2"
                }
                onClick={() => setCategory("All")}
              >
                All
              </div>
              <div
                className={
                  category === "Carbohydrate"
                    ? "category-type-item-active2"
                    : "category-type-item2"
                }
                onClick={() => setCategory("Carbohydrate")}
              >
                Carbohydrate
              </div>
              <div
                className={
                  category === "Drink"
                    ? "category-type-item-active2"
                    : "category-type-item2"
                }
                onClick={() => setCategory("Drink")}
              >
                Drinks
              </div>
              <div
                className={
                  category === "junks"
                    ? "category-type-item-active2"
                    : "category-type-item2"
                }
                onClick={() => setCategory("junks")}
              >
                Pastries & junks
              </div>
              <div
                className={
                  category === "Protein"
                    ? "category-type-item-active2"
                    : "category-type-item2"
                }
                onClick={() => setCategory("Protein")}
              >
                Proteins
              </div>
              <div
                className={
                  category === "pack"
                    ? "category-type-item-active2"
                    : "category-type-item2"
                }
                onClick={() => setCategory("pack")}
              >
                pack
              </div>
            </div>
            <div className="collection-body">
              {/* collection head */}
              <table>
                <tr>
                  <th className="imageHead">image</th>
                  <th>Product Name</th>
                  <th>Vendor</th>
                  <th>Price</th>
                  <th>Availability</th>
                  <th>Action</th>
                </tr>
                <hr />
                {filteredProducts.length > 0 ? (
                  filteredProducts
                    .filter((item) => item.vendor === Store)
                    .filter((item) => {
                      if (category === "All") {
                        return item;
                      } else if (item.category === category) {
                        return item;
                      } else if (search) {
                        setCategory("All");
                      }
                    })
                    .map((item) => {
                      return (
                        <tr className="rounded bg-light  h-100">
                          <td className="imageView">
                            <img src={item.image} alt={item.name} height={50} />
                          </td>
                          <td>{item.Pname}</td>
                          <td>{item.vendor}</td>
                          <td>{item.price}</td>
                          <td>
                            <div
                              className={
                                item.availability === "inStock"
                                  ? "Instock"
                                  : "outOfStock"
                              }
                            >
                              {item.availability}
                            </div>
                          </td>
                          <td className="d-flex gap-4">
                            {loading ? (
                              <div
                                className="spinner-border spinner-border-sm"
                                role="status"
                              ></div>
                            ) : (
                              <div
                                style={{
                                  cursor: "pointer",
                                }}
                                onClick={() => {
                                  handleDelete(item._id);
                                }}
                              >
                                <FaTrash color="red" />
                              </div>
                            )}

                            <div
                              style={{
                                cursor: "pointer",
                              }}
                            >
                              <Link to={`/formEdit/${item._id}`}>
                                <FaEye color="blue" />
                              </Link>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                ) : (
                  <tr className="text-center  w-100">
                    <td colSpan={6}>No result of "{search}"</td>
                  </tr>
                )}
              </table>
            </div>
          </>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};
export default VendorPage;
