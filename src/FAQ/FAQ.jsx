import React, { useState } from "react";
import "./FAQ.css";
import Nav from "../Nav/Nav";
import { FaSearch } from "react-icons/fa";
const FAQ = () => {
  //accordion items
  const reignboxesPolicies = [
    {
      header: "Missing Items",
      content:
        "If an item is missing from your order and you’d still like to receive it, please contact our support team within 12 hours, providing a photo of your order. If we are unable to deliver the missing item, we will refund the full cost of that item.",
    },
    {
      header: "Wrong Order",
      content:
        "If you receive an incorrect order, please reach out to us within 12 hours with a photo. We will try to pick up the wrong item and deliver your correct order. If that’s not possible due to unavailability or other reasons, we will refund the full cost of your order.",
    },
    {
      header: "Taste and Quality Issues",
      content:
        "Unfortunately, we cannot issue refunds based on personal preferences like taste, spice level, or meal quality. If you're unsatisfied with a meal, let us know within 24 hours, and we’ll share your feedback with the vendor.",
    },
    {
      header: "Complimentary Items",
      content:
        "Complimentary items are goodwill gestures and are not eligible for refunds, whether due to omission or quality concerns.",
    },
    {
      header: "Order Customization Errors",
      content:
        "If there’s a customization error from the vendor, please contact our support team within 24 hours with a photo of the order. We will issue a partial refund depending on the severity of the error and how it impacts your meal.",
    },
    {
      header: "Order Cancellation",
      content:
        "Orders can be canceled as long as the vendor hasn’t begun preparing or packing the food. Once food preparation starts, we cannot cancel or issue refunds.",
    },
    {
      header: "Order Modification",
      content:
        "If you need to modify your order after placing it, contact our support team immediately. If the food preparation has started or the delivery is en route, modifications won’t be possible, and no refund will be issued.",
    },
    {
      header: "Refusal of Delivery",
      content:
        "If you refuse a delivery for any reason other than receiving the wrong order, we will not be able to issue a refund.",
    },
    {
      header: "Failed Delivery",
      content:
        "Our dispatch team will attempt to contact you upon arrival and wait for up to 10 minutes. If we cannot reach you (due to a wrong number, phone switched off, etc.), the dispatch team will leave, and no refund will be given. If you contact us within 20 minutes after the dispatch team leaves, you can pay for another delivery fee to reschedule delivery. Beyond this time frame, no rescheduling or refunds will be possible.",
    },
    {
      header: "Delivery Location Access",
      content:
        "Ensure that our dispatch team can easily access your hostel or campus area. Please be available at the agreed drop-off point when the dispatch team arrives to avoid any delays.",
    },
    {
      header: "Payment Issues",
      content:
        "If you have been charged for an order that wasn’t placed or experience any payment issues, reach out to our support team for resolution and a possible refund.",
    },
    {
      header: "Spilled Items",
      content:
        "If your order was spilled during delivery, contact our support team within 12 hours with a photo. We’ll investigate with the dispatch team/vendor and may issue a partial refund depending on the severity.",
    },
    {
      header: "Delivery Address Issues",
      content:
        "If the delivery address is incorrect or incomplete, and the dispatch team needs to go to another location, you’ll be required to pay an additional delivery fee. If the address is outside our service area (hostel or campus), we cannot deliver or issue a refund. Please ensure your delivery details are accurate before placing an order.",
    },
    {
      header: "Order Cancellation by Vendor",
      content:
        "If the vendor cancels your order for any reason, you’ll be notified promptly via email and a push notification. A full refund will be issued to your bank account in such cases.",
    },
    {
      header: "What is the reignboxes Service Fee",
      content:
        "The reignboxes service fee is a small charge added to each order to help cover the operational costs of running our platform. This fee supports the maintenance of our technology, customer support services, and ensures that we can continue to offer a seamless experience for our users.",
    },
    {
      header: "Why Does reignboxes Charge a Service Fee?",
      content:
        "The service fee allows us to maintain the quality and efficiency of our platform. It helps cover the costs of technology upkeep, customer support, and continuous improvements to our service. By charging this fee, we can ensure a seamless and reliable experience for both customers and vendors, making it easier to deliver your favorite meals quickly and efficiently.",
    },
    {
      header: "What is reignboxes?",
      content:
        "reignboxes is a food delivery service designed specifically for students and staff at nigeria. reignboxes We partner with local vendors to bring a variety of meals directly to your hostel or campus area, offering convenience, variety, and affordability. Our platform is committed to providing quick and reliable delivery, making it easier for you to satisfy your cravings without leaving campus.At , we focus on supporting students by offering employment opportunities, as well as delivering meals that suit your busy schedule. Whether it's lunch, dinner, or a snack, we've got you covered with a range of options from trusted local vendors.",
    },
  ];
  //search state
  const [search, setSearch] = useState("");
  const handleInput = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const filteredItem = reignboxesPolicies.filter((item) => {
    if (search === "") {
      return item;
    } else if (
      item.header.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    ) {
      return item;
    }
  });
  return (
    <div>
      <Nav />
      <div className="pageBody">
        <div className="d-md-flex d-sm-block justify-content-between px-4">
          <div className="about-offer-head px-3">Frequently asked Question</div>
          <div className="input-container mt-2">
            <FaSearch className="ms-3" />
            <input
              type="text"
              onChange={handleInput}
              placeholder="search something..."
              className="inputBx"
            />
          </div>
        </div>
        <div
          class="accordion accordion-flush mt-3 px-4"
          id="accordionFlushExample"
        >
          {filteredItem.length > 0 ? (
            filteredItem.map((item, index) => {
              const collapseId = `flush-collapse-${index}`;
              const headingId = `flush-heading-${index}`;
              return (
                <div
                  className="accordion-item shadow-sm border-none mt-3"
                  key={index}
                >
                  <h2 className="accordion-header" id={headingId}>
                    <button
                      className="accordion-button collapsed "
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#${collapseId}`}
                      aria-expanded="false"
                      aria-controls={collapseId}
                    >
                      {item.header}
                    </button>
                  </h2>
                  <div
                    id={collapseId}
                    className="accordion-collapse collapse"
                    aria-labelledby={headingId}
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div className="accordion-body">{item.content}</div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center"> No results found for "{search}".</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
