import React from "react";
import { Link } from "react-router-dom";

const AdminSidebar = () => (
  <nav>
    <ul className="nav flex-column mt-3">
      <li className="nav-item">
        <Link to="/admin/dashboard" className="nav-link text-secondary">
          Dashboard
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/admin/product" className="nav-link text-secondary">
          Product
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/admin/products" className="nav-link text-secondary">
          Products
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/admin/category" className="nav-link text-secondary">
          Category
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/admin/subcategory" className="nav-link text-secondary">
          Sub Category
        </Link>
      </li>

      {/* <li className="nav-item">
        <Link to="/admin/coupon" className="nav-link text-secondary">
          Coupon
        </Link>
      </li> */}

      {/* <li className="nav-item">
        <Link to="/user/password" className="nav-link text-secondary">
          Password
        </Link>
      </li> */}
    </ul>
  </nav>
);

export default AdminSidebar;
