import React, { useState } from "react";
import Nav from "../Nav/Nav";
import "./Allstore.css";
import { CiSearch } from "react-icons/ci";
import Vendors from "../Vendors/Vendors";
import { Link } from "react-router-dom";
import { FaStar, FaStore } from "react-icons/fa6";
import { TbCurrencyNaira, TbMotorbike } from "react-icons/tb";
const AllStore = () => {
  const [input, setInput] = useState("");
  return (
    <div>
      <Nav />
      <div className="pageBody p-3">
        <div></div>
        <div className="vendor_head_container ">
          <div className="vendor-sub_head2">Choose desired vendor</div>
          <div className="Vendor-head text-center my-3">😍Explore Vendors</div>
        </div>{" "}
        <div className="storesContent">
          <span className="text-success">{Vendors.length}</span> store available
        </div>
        <div className="d-flex align-items-center gap-2 search-cont mt-3">
          <CiSearch />
          <input
            placeholder="search something"
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <div className="vendor-list-container mt-3">
          {Vendors.filter((item) => {
            if (input === "") {
              return item;
            } else if (
              item.name.toLocaleLowerCase().includes(input.toLocaleLowerCase())
            ) {
              return item;
            }
          }).map((item, index) => (
            <Link
              to={`/${item.name}`}
              onClick={() => window.scroll(0, 0)}
              key={index}
              className="vendor-items shadow-sm"
            >
              <img src={item.Image} alt={item.name} />
              <div className="vendor-contents">
                <div>
                  <FaStore className="me-1" />
                  {item.name}
                </div>
                <div className="d-flex justify-content-between">
                  <div className="d-flex align-items-center gap-1">
                    <div>
                      <TbMotorbike size={18} />
                    </div>
                    <div>
                      <TbCurrencyNaira size={18} />
                    </div>
                    <div>|</div>
                    <div>10-20min</div>
                  </div>
                  <div className="d-flex align-items-center">
                    <FaStar color="orange" className="mx-1" />5
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllStore;
