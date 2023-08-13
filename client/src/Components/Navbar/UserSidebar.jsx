import React from "react";
import { Link } from "react-router-dom";
const UserSidebar = () => {
  return (
    <nav>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link to="/user/history" className="nav-link text-secondary">
            History
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/user/password" className="nav-link text-secondary">
            Password
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/user/wishlist" className="nav-link text-secondary">
            Wishlist
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default UserSidebar;
