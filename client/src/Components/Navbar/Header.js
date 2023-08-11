import React, { useState } from "react";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firbase";
import { loggedInUser } from "../Redux/reducers/userReducers";
import { useDispatch } from "react-redux";
const { SubMenu, Item } = Menu;
const Header = () => {
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
  };

  // create the logout functionality
  const Logout = () => {
    // logout from the firbase..
    auth.signOut();
    // update the redux state to null..
    dispatch(loggedInUser(null));
    // navigate to login page
    navigate("/login");
  };

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Item key="home" icon={<AppstoreOutlined />}>
        <Link to="/" style={linkStyle}>
          Home
        </Link>
      </Item>
      {/* conditionally rendering the button based on the user present or not */}
      {userData && (
        <SubMenu
          icon={<SettingOutlined />}
          title={userName}
          className="ml-auto"
        >
          <Item className="text-primary" key="setting:1">
            option 2
          </Item>
          <Item className="text-primary" key="setting:2">
            Option 2
          </Item>
          <Item
            className="text-primary"
            icon={<LogoutOutlined />}
            onClick={Logout}
          >
            Logout
          </Item>
        </SubMenu>
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
    </Menu>
  );
};

export default Header;
