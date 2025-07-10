import React, { useContext, useState } from "react";
import { IoAdd, IoClose } from "react-icons/io5";
import { FaHeart, FaMinus, FaPlus } from "react-icons/fa6";
import { ContextApi } from "../ShopContext/ShopContext";
import "../Items/Items.css";
import { TbCurrencyNaira } from "react-icons/tb";
import { CiHeart } from "react-icons/ci";
function Recent(props) {
  const { WishList, addtowishList, RemoveList } = useContext(ContextApi);
  const { id, image, Pname, category, vendor } = props;

  //wish List toggle
  const toggleWhishList = () => {
    if (WishList[id] > 0) {
      RemoveList(id);
    } else {
      addtowishList(id);
    }
  };
  return (
    <div className="List" key={id}>
      <div>
        <img src={image} alt="" className="product_img" />
      </div>
      <div className="com">
        <div>
          <div className="name">{Pname}......</div>
          <div className="category">{category}</div>
          <div className="category mt-3">{vendor}</div>
        </div>
        <div>
          <button className="wishListBtn" onClick={toggleWhishList}>
            {WishList[id] > 0 ? <FaHeart /> : <CiHeart />}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Recent;
