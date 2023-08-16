import React from "react";
import { useState } from "react";
const ProductFormCreate = ({
  handleChange,
  title,
  description,
  price,
  quantity,
  handleSubmit,
  colors,
  brands,
  color,
  brand,
}) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            className="form-control"
            value={title}
            onChange={handleChange}
            placeholder="Enter the Product title"
            autoFocus
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            name="description"
            className="form-control"
            value={description}
            onChange={handleChange}
            placeholder="Enter the Product description"
            required
          />
        </div>

        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            name="price"
            className="form-control"
            value={price}
            onChange={handleChange}
            placeholder="Enter the Product Price"
            required
          />
        </div>

        <div className="form-group">
          <label>Shipping</label>
          <select
            name="shipping"
            className="form-control"
            onChange={handleChange}
            required
          >
            <option>Please select</option>
            <option className=" bg-secondary" value="No">
              No
            </option>
            <option className=" bg-secondary" value="Yes">
              Yes
            </option>
          </select>
        </div>

        <div className="form-group">
          <label>Quantity</label>
          <input
            type="number"
            name="quantity"
            className="form-control"
            value={quantity}
            onChange={handleChange}
            placeholder="Enter the Product Quantity"
            required
          />
        </div>

        <div className="form-group">
          <label>Color</label>
          <select name="color" className="form-control" onChange={handleChange}>
            <option>Please select</option>
            {colors?.map((c) => (
              <option className=" bg-secondary" key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Brand</label>
          <select name="brand" className="form-control" onChange={handleChange}>
            <option>Please select</option>
            {brands?.map((b) => (
              <option className=" bg-secondary" key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>

        <button className="btn btn-outline-success" disabled={!color && !brand}>
          Create
        </button>
      </form>
    </div>
  );
};

export default ProductFormCreate;
