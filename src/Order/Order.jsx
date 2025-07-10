import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RiCheckboxCircleLine } from "react-icons/ri";
import "./Order.css";
import { CiCircleCheck, CiEdit } from "react-icons/ci";
import { RxRadiobutton } from "react-icons/rx";
import { TbCurrencyNaira } from "react-icons/tb";
import { CiCircleInfo } from "react-icons/ci";
import { IoRadioButtonOnOutline } from "react-icons/io5";
import { CiBank } from "react-icons/ci";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
const Order = () => {
  const routes = useNavigate();
  const location = useLocation();
  const currentDate = new Date();
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "short", // Shortened day, e.g., "Tue"
    month: "short", // Shortened month, e.g., "Jan"
    day: "numeric", // Numeric day, e.g., "6"
  }).format(currentDate);
  const { form, deliveryFee, serviceFee } = location.state || {}; // Access the passed state

  useEffect(() => {
    if (form) {
      console.log("Retrieved Form Data:", form);
    }
  }, [form]);

  return (
    <div>
      <div className="checkBox-cont">
        <div className="text-center">
          <CiCircleCheck className="icon" size={20} />
          <div className="process-text">login</div>
        </div>
        <div className="line-through"></div>
        <div className="text-center">
          <CiCircleCheck className="icon" size={20} />
          <div className="process-text">Address</div>
        </div>
        <div className="line-through"></div>
        <div className="text-center">
          <CiCircleCheck className="icon" size={20} />
          <div className="process-text">payment</div>
        </div>
        <div className="line-through"></div>
        <div className="text-center ms-1">
          <div className="process-number">4</div>
          <div className="process-text me-1">Confirm</div>
        </div>
      </div>
      <div className="order-summary-body">
        <div className="order-summary-header text-success p-2">
          order Approved <IoMdCheckmarkCircleOutline />
        </div>
        <div className="row w-100 mt-4">
          <div className="col-md-8 col-sm-12">
            <div className="order-summary-header">delivery option</div>
            <div className="order-summary-bd">
              <div className="d-flex align-items-center gap-1">
                <RxRadiobutton size={20} />
                <div className="date">{formattedDate}</div>
              </div>
              <div className="delivery-details">Standard delivery</div>
              <div className="delivery-price">
                <TbCurrencyNaira />
                {deliveryFee}
              </div>

              <div className="order-company">reignboxes delivery service</div>
              <div className="info">
                <CiCircleInfo /> &#160; order will be delivered soon
              </div>
            </div>
            <div>
              <div className="order-summary-header mt-3 p-2">order summary</div>
              <div className="order-id">order id :{form.orderId}</div>
              <div className="order-id">Vendor : {form.Vendor}</div>

              <div className="order-summary-product">
                {form.cartItems.map((item) => {
                  return (
                    <div className="order-summary-items">
                      <div className="d-flex gap-4">
                        <img
                          src={item.productImage}
                          order
                          alt=""
                          className="order-summary-image"
                        />
                        <div>
                          <div className="order-category">{item.category}</div>
                          <div className="order-name my-2">
                            {item.productName}
                          </div>
                          <div className="order-name text-capitalize">
                            quantity:{item.quantity}
                          </div>
                          <div className="order-name fw-bold mt-2">
                            <TbCurrencyNaira /> {item.FoodPrice}
                          </div>
                        </div>
                      </div>
                      <div>
                        <IoRadioButtonOnOutline />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-12">
            <div className="order-summary-header mt-3 d-flex align-items-center justify-content-between">
              Delivery Address{" "}
              <div>
                <CiEdit size={20} />
              </div>
            </div>
            <div className="order-address">{form.Address}</div>

            <div className="order-summary-header mt-3 p-2">payment method</div>
            <div className="d-flex align-items-center gap-2 mt-4">
              <div className="bank-icn">
                <CiBank color="green" size={30} />
              </div>
              <div className="transfer-type">bank transfer</div>
            </div>
            <div className="pricing-details shadow-sm mt-5">
              <div className="pricing-items">
                <div className="price-item-name">SubTotal</div>
                <div className="price-item">
                  <TbCurrencyNaira /> {form.totalPrice}
                </div>
              </div>

              <div
                className="link"
                onClick={() => routes("/store", { replace: true })}
              >
                continue shopping
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
