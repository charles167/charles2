import "./App.css";
import Store from "./Store";
import { Route, Routes } from "react-router-dom";
import ProductStore from "./ProductStores/ProductStore";
import ShopContext from "./ShopContext/ShopContext";
import Cart from "./CartPage/Cart";
import WishList from "./WishList/WishList";
import Login from "./Login/Login";
import Landing from "./Landing/Landing";
import Nav from "./Nav/Nav";
import About from "./About/About";
import Contact from "./Contact/Contact";
import Vendors from "./Vendors/Vendors";
import Payment from "./Payment/Payment";
import Order from "./Order/Order";
import FAQ from "./FAQ/FAQ";
import VendorLogin from "./VendorPage/VendorLogin";
import VendorPage from "./VendorPage/VendorPage";
import ProductForm from "./ProductForm/ProductForm";
import EditForm from "./EditForm/EditForm";
import AllStore from "./AllStore/AllStore";
import TawkToChat from "./TawkToChat";
function App() {
  return (
    <>
      <ShopContext>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/store" element={<Store />} />
          <Route path="/Order_payment" element={<Payment />} />
          <Route path="/FAQ" element={<FAQ />} />
          <Route path="/order" element={<Order />} />
          <Route path="/AllStores" element={<AllStore />} />
          {Vendors.map((item) => {
            return (
              <Route
                path={`/Product-form/${item.name}`}
                element={<ProductForm Store={`${item.name}`} />}
              />
            );
          })}
          <Route path="/VendorLogin" element={<VendorLogin />} />
          <Route path="/formEdit/:id" element={<EditForm />} />
          {Vendors.map((item) => {
            return (
              <Route
                path={`/${item.name}`}
                element={<ProductStore Store={`${item.name}`} />}
              />
            );
          })}
          {Vendors.map((item) => {
            return (
              <Route
                path={`Admin/${item.name}`}
                element={<VendorPage Store={`${item.name}`} />}
              />
            );
          })}

          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
          <Route path="/wishList" element={<WishList />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/landing_Page" element={<Landing />} />
        </Routes>
        <TawkToChat />
      </ShopContext>
    </>
  );
}

export default App;
