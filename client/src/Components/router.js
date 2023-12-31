import React from "react";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/auth/register";
import Home from "./pages/auth/home";
import Login from "./pages/auth/login";
import RegisterComplete from "./pages/auth/registerComplete";
import ForgotPassword from "./pages/auth/forgotpassword";
import UserDashBoard from "./LoginUser/userDashboard";
import Password from "./LoginUser/password";
import AdminDashBoard from "./admin/adminDashboard";
import CreateCategory from "./admin/category/CreateCategory";
import UpdateCatgory from "./admin/category/UpdateCatgory";
import Subcategory from "./admin/Subcategory/subcategory";
import UpdateSubcatgory from "./admin/Subcategory/updateSubcategory";
import ProductCreate from "./admin/product/productCreate";
import AllProducts from "./admin/product/allproducts";
import ProductUpdate from "./admin/product/productUpdate";
import ShowProductDetails from "./pages/auth/showproductsdetails";
import Categoryhome from "./pages/category/categoryhome";
import Subcategoryhome from "./pages/subcategory/subcategoryhome";
import Shop from "./pages/auth/shop";
import CartPage from "./pages/auth/cart";
import Checkout from "./admin/checkout/checkout";
import Userhistory from "./pages/auth/history";
const Router = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/register/" element={<Register></Register>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route
          path="/register/complete"
          element={<RegisterComplete></RegisterComplete>}
        ></Route>
        <Route
          path="/forgot/password"
          element={<ForgotPassword></ForgotPassword>}
        ></Route>
        <Route
          path="user/dashboard"
          element={<UserDashBoard></UserDashBoard>}
        ></Route>

        <Route
          path="admin/dashboard"
          element={<AdminDashBoard></AdminDashBoard>}
        ></Route>
        <Route path="user/password" element={<Password></Password>}></Route>
        <Route
          path="admin/category"
          element={<CreateCategory></CreateCategory>}
        ></Route>
        <Route
          path="admin/category/:slug"
          element={<UpdateCatgory></UpdateCatgory>}
        ></Route>
        <Route
          path="admin/subcategory/"
          element={<Subcategory></Subcategory>}
        ></Route>
        <Route
          path="admin/subcategory/:slug"
          element={<UpdateSubcatgory></UpdateSubcatgory>}
        ></Route>
        <Route
          path="admin/product"
          element={<ProductCreate></ProductCreate>}
        ></Route>
        <Route
          path="admin/products"
          element={<AllProducts></AllProducts>}
        ></Route>
        <Route
          path="admin/product/:slug"
          element={<ProductUpdate></ProductUpdate>}
        ></Route>
        <Route
          path="product/:slug"
          element={<ShowProductDetails></ShowProductDetails>}
        ></Route>
        <Route
          path="category/:slug"
          element={<Categoryhome></Categoryhome>}
        ></Route>
        <Route
          path="subcategory/:slug"
          element={<Subcategoryhome></Subcategoryhome>}
        ></Route>
        <Route path="/shop" element={<Shop></Shop>}></Route>
        <Route path="/cart" element={<CartPage></CartPage>}></Route>
        <Route path="/checkout" element={<Checkout></Checkout>}></Route>
        <Route
          path="/user/history"
          element={<Userhistory></Userhistory>}
        ></Route>
      </Routes>
    </div>
  );
};

export default Router;
