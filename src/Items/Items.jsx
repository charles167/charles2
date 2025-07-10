import React, { useContext, useState } from "react";
import { IoAdd, IoClose } from "react-icons/io5";
import { FaHeart, FaMinus, FaPlus } from "react-icons/fa6";
import { ContextApi } from "../ShopContext/ShopContext";
import "./Items.css";
import { TbCurrencyNaira } from "react-icons/tb";
import { CiHeart } from "react-icons/ci";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { TiHeartOutline } from "react-icons/ti";
import { RiShoppingCartLine } from "react-icons/ri";
import { VscChromeClose } from "react-icons/vsc";
import { LuPlus } from "react-icons/lu";
import { FiMinus } from "react-icons/fi";
function Items(props) {
  const { addToCart, cartItms, Remove, WishList, addtowishList, RemoveList } =
    useContext(ContextApi);
  const { Pname, price, image, id, category, availability } = props;

  // State to store selected product details
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false); // State to show success message
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
    setQuantity(cartItms[id] || 1); // Preserve existing quantity in cart
  };

  const closeCart = () => {
    setSelectedProduct(null);
  };

  const cartAdded = () => {
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
  return (
    <>
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
                <div className={availability === "inStock" ? "type1" : "type2"}>
                  {availability === "inStock" ? "IN STOCK" : "OUT OF STOCK"}
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
                    WishList[id] > 0
                      ? "single-wishList"
                      : "single-wishList-none"
                  }`}
                  onClick={() => toggleWhishList(id)}
                >
                  <TiHeartOutline className="mb-1 me-1" />
                  Add to wishlist
                </div>
                <div className="single-button shadow-sm" onClick={cartAdded}>
                  <RiShoppingCartLine className="mb-1 me-1" />
                  Add to cart
                </div>
                <div className="single-total">
                  <div>Total : </div>
                  <div>
                    <TbCurrencyNaira />
                    {Math.ceil(selectedProduct.price * cartItms[id])}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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
              image ||
              "https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-image-vector-illustration-isolated-png-image_1694547.jpg"
            }
            alt={Pname}
            onError={(e) =>
              (e.target.src =
                "https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-image-vector-illustration-isolated-png-image_1694547.jpg")
            }
          />
        </div>
        <div className="product-info">
          <div className="category">{category}</div>
          <div className="name">{Pname.slice(0, 10)}...</div>
          <div style={{ display: "flex", marginTop: 10 }}></div>

          <div className="d-flex gap-2 align-items-center">
            <div className="new-price">
              {" "}
              <TbCurrencyNaira />
              {price}
            </div>
          </div>
          <div className={availability === "inStock" ? "type1" : "type2"}>
            {availability === "inStock" ? "IN STOCK" : "OUT OF STOCK"}
          </div>
        </div>
        <div className="hover-buttons">
          <button
            className="buy-btn shadow-sm"
            onClick={() => {
              addToCart(id);
            }}
          >
            {cartItms[id] > 0 ? (
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
              addtowishList(Number(id));
            }} // Pass a function reference
          >
            {WishList[id] > 0 ? (
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
            onClick={() => {
              openCart({ Pname, price, image, category, availability });
            }}
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
            onClick={() => addToCart(id)}
          >
            {cartItms[id] > 0 ? "Item In Cart" : "Add To Cart"}
          </button>
        </div>
      </div>
    </>
  );
}

export default Items;
