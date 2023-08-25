import React, { useState } from "react";
import { Menu, Badge } from "antd";
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
  GithubOutlined,
  LinkedinOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firbase";
import { loggedInUser } from "../Redux/reducers/userReducers";
import { useDispatch } from "react-redux";
import Searchform from "../forms/Searchform";
import { searchQuery } from "../Redux/reducers/searchreducers";
const { SubMenu, Item } = Menu;
const Header = () => {
  // this will give the card from the redux
  const cart = useSelector((state) => state.rootreducer.cart);

  // taking data from loggedInuser redux store..
  let userData = useSelector((state) => state.rootreducer.user);
  let userName;
  if (userData) {
    userName = userData.email.slice(0, 10); // show on the top based on logged in user
  } else {
    userName = "First login";
  }

  const [current, setCurrent] = useState("home");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const linkStyle = {
    textDecoration: "none", // Remove text decoration underline
    fontWeight: "bold",
  };

  // create the logout functionality
  const Logout = () => {
    // logout from the firbase..
    auth.signOut();
    // update the redux state to null..
    dispatch(loggedInUser(null));
    // navigate to login page
    dispatch(searchQuery({ text: "" }));
    navigate("/");
  };
  // dispatch(loggedInUser(null));
  return (
    <>
      <Menu
        onClick={handleClick}
        selectedKeys={[current]}
        mode="horizontal"
        style={{ backgroundColor: "white" }}
      >
        <Item key="home" icon={<AppstoreOutlined />}>
          <Link to="/" style={linkStyle}>
            Home
          </Link>
        </Item>
        {/* this will show only there are no user means home page or if user===not admin */}
        {(!userData || userData.role === "subscriber") && (
          <Item key="Shop" icon={<ShoppingOutlined />}>
            <Link to="/shop" style={linkStyle}>
              Shop
            </Link>
          </Item>
        )}

        {!userData && (
          <Item key="login" icon={<UserOutlined />}>
            <Link to="/login" style={linkStyle}>
              Login
            </Link>
          </Item>
        )}
        {!userData && (
          <Item key="register" icon={<UserAddOutlined />}>
            <Link to="/register" style={linkStyle}>
              Register
            </Link>
          </Item>
        )}
        {/* Adding the two icons on the right */}
        <div className="ml-auto">
          <Link
            to="https://www.linkedin.com/in/rahul-keshri-814bb8221/"
            target="_main"
          >
            <LinkedinOutlined
              style={{ fontSize: "25px", color: "#000" }}
              className="mx-3 right"
            ></LinkedinOutlined>
          </Link>
          <Link to="https://github.com/keshri522" target="_main">
            <GithubOutlined
              style={{ fontSize: "25px", color: "#000" }}
              className="mx-3 right"
            ></GithubOutlined>
          </Link>
        </div>

        {/* this is for the cart option showing */}
        {(!userData || userData.role === "subscriber") && (
          <Item key="cart" icon={<ShoppingCartOutlined />} className="ml-1">
            <Link to="/cart" style={linkStyle}>
              <Badge color="volcano" count={cart.length} offset={[9, 0]}>
                Cart
              </Badge>
            </Link>
          </Item>
        )}
        {(!userData || userData.role === "subscriber") && (
          <Item style={linkStyle}>
            <Searchform className="p-2"></Searchform>
          </Item>
        )}

        {/* conditionally rendering the button based on the user present or not */}
        {userData && (
          <SubMenu
            icon={<SettingOutlined />}
            title={userName}
            style={linkStyle}
          >
            {/* conditonlally rendering the submenu based on user role */}
            {userData && userData.role === "subscriber" && (
              <Item className="text-primary">
                <Link to="/user/dashboard" style={linkStyle}>
                  {" "}
                  Dashboard
                </Link>
              </Item>
            )}

            {userData && userData.role === "admin" && (
              <Item className="text-primary">
                <Link to="/admin/dashboard" style={linkStyle}>
                  {" "}
                  Dashboard
                </Link>
              </Item>
            )}
            <Item
              className="text-primary"
              icon={<LogoutOutlined />}
              onClick={Logout}
              style={linkStyle}
            >
              Logout
            </Item>
          </SubMenu>
        )}
      </Menu>
    </>
  );
};

export default Header;
