import React from "react";
import { useState } from "react";
import { Select } from "antd";
const { Option } = Select;
const ProductFormCreate = ({
  handleChange,
  handleSubmit,
  subcategory,
  showSub,
  Setvalues,
  handleChangeCategory,
  values,
  // this subcategory is use state props coming from productCreate components
}) => {
  const {
    title,
    description,
    price,
    categories,
    category,
    Subcatergory,
    shipping,
    quantity,
    images,
    colors,
    brands,
    color,
    brand,
  } = values;

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

        <div className="form-group">
          <label>Catgories</label>
          <select
            name="category"
            className="form-control"
            onChange={handleChangeCategory}
          >
            <option>Please select</option>
            {categories?.map((c) => (
              <option className=" bg-secondary" key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        {/* this is subcategory once user clicked on the parent category then only based on the categpry we will them the subcategory */}
        {showSub && (
          <div>
            <label>Sub Categories</label>
            <Select
              mode="multiple"
              style={{ width: "100%" }}
              placeholder="Please select"
              value={Subcatergory}
              onChange={(value) =>
                Setvalues({ ...values, Subcatergory: value })
              }
            >
              {subcategory.length &&
                subcategory.map((s) => (
                  <Option key={s._id} value={s._id}>
                    {s.name}
                  </Option>
                ))}
            </Select>
          </div>
        )}

        <button className="btn btn-outline-success" disabled={!color && !brand}>
          Create
        </button>
      </form>
    </div>
  );
};

export default ProductFormCreate;
