import React from "react";
import { Link } from "react-router-dom";
const Productdetails = ({ product }) => {
  // destructing the itesm from product props.
  const {
    price,
    brand,
    category,
    color,
    Subcatergory,
    sold,
    shipping,
    quantity,
  } = product;

  return (
    <>
      <ul class="list-group">
        <li class="list-group-item d-flex justify-content-between align-items-center font-weight-bold">
          Price
          <span class="text-secondary">${price}</span>
        </li>
        {/* checking if the category is there then show  this is clickable we need to use Link */}
        {category && (
          <li class="list-group-item d-flex justify-content-between align-items-center font-weight-bold">
            Category
            <Link
              to={`/category/${category.slug}`}
              style={{ textDecoration: "none" }}
            >
              {category.name}
            </Link>
          </li>
        )}
        {/* this is for the subcategory if we multiple subcategory then show in li  */}
        {Subcatergory && (
          <li class="list-group-item d-flex justify-content-between align-items-center subcategory-list">
            Subcategory
            {Subcatergory.map((items, index) => (
              <Link
                key={items._id}
                to={`/Subcatergory/${Subcatergory[index].slug}`}
                style={{ textDecoration: "none" }}
              >
                {items.name}
              </Link>
            ))}
          </li>
        )}
        <li class="list-group-item d-flex justify-content-between align-items-center font-weight-bold">
          Shipping
          <span class="text-secondary">{shipping}</span>
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-center font-weight-bold">
          Color
          <span class="text-secondary">{color}</span>
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-center font-weight-bold">
          Brand
          <span class="text-secondary">{brand}</span>
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-center font-weight-bold">
          Available
          <span class="text-secondary">{quantity}</span>
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-center font-weight-bold">
          Sold
          <span class="text-secondary">{sold}</span>
        </li>
      </ul>
    </>
  );
};

export default Productdetails;
