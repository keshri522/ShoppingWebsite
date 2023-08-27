import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Getusercart } from "../../functions/User";
import { CloseCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import Invoice from "../../order/invoice";

import { PDFDownloadLink } from "@react-pdf/renderer";
import UserSidebar from "../../Navbar/UserSidebar";
import { useNavigate } from "react-router";
const Userhistory = () => {
  const navigate = useNavigate();
  // getting token from redux store
  const User = useSelector((state) => state.rootreducer.user);

  // for storing the cart items in usestate
  const [products, Setproducts] = useState([]);
  const [loading, Setloading] = useState(false);

  // this function will give us all the cart that saved once click on the procedd button from database
  useEffect(() => {
    Setloading(true);
    if (User && User.token) {
      Getusercart(User.token).then((res) => {
        Setproducts(res.data.products);
        // console.log(res.data.products);
        Setloading(false);
      });
    }
  }, []);

  // donwload pdf usingvthis functin
  const showDownloadLink = () => (
    <PDFDownloadLink
      document={<Invoice products={products}></Invoice>}
      fileName="invoice.pdf"
      className="btn btn-sm btn-block btn-outline-primary"
    >
      Download PDF
    </PDFDownloadLink>
  );
  //function which will show the product as order list of user
  const showOrderInTable = (order) => (
    <table className="table table-bordered">
      <thead className="thead-light">
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Price</th>
          <th scope="col">Brand</th>
          <th scope="col">Color</th>
          <th scope="col">Count</th>
          <th scope="col">Shipping</th>
        </tr>
      </thead>

      <tbody>
        {products.map((p, i) => (
          <tr key={i}>
            <td className="text-secondary">
              <b>{p.product.title}</b>
            </td>
            <td className="text-secondary font-weight-bold">
              ${p.product.price}
            </td>
            <td className="text-secondary  font-weight-bold">{p.brand}</td>
            <td className="text-secondary  font-weight-bold">{p.color}</td>
            <td className="text-secondary  font-weight-bold">{p.count}</td>
            <td>
              {p.shipping === "Yes" ? (
                <CheckCircleOutlined style={{ color: "green" }} />
              ) : (
                <CloseCircleOutlined style={{ color: "red" }} />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const showEachOrders = () =>
    products.map((order, i) => (
      <div key={i} className="m-5 p-3 card">
        {showOrderInTable(order)}
        <div className="row">
          <div className="col">{showDownloadLink()}</div>
        </div>
      </div>
    ));
  return (
    <>
      <div className="container-fluid p-5">
        <div className="row mt-3">
          <div className="col-md-2">
            <UserSidebar></UserSidebar>
          </div>
          <div className="col text-center text-primary mt-3">
            <h4>
              {products.length > 0
                ? "User Product Orders"
                : "No Proctuct Orders"}
            </h4>
            <br />
            {showEachOrders()}
            <div className="col text-center mt-3">
              <button
                className="btn btn-warning btn-lg"
                onClick={() => navigate("/")}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Userhistory;
