// in this folder i create all the curd operation of the category route lie delete,update,read,and create, that have added in backedn..
import axios from "axios";
// this is for creating category api..  this is protected routes so we need to send the toekn also
const createCatetogy = async (category, token) => {
  await axios.post(`${process.env.REACT_APP_ROUTE_ADMIN}/category`, category, {
    headers: {
      token: token,
    },
  });
};
// for the get all the categroy this is not protected it can access by any one..
const getCategory = async () => {
  await axios.get(`${process.env.REACT_APP_ROUTE_ADMIN}/categories`);
};
// get category by names
const getCategoryNames = async (slug) => {
  await axios.get(`${process.env.REACT_APP_ROUTE_ADMIN}/category/${slug}`);
};

// for the delete of category.
const removeCategory = async (slug, token) => {
  await axios.delete(`${process.env.REACT_APP_ROUTE_ADMIN}/category/${slug}`, {
    headers: {
      token: token,
    },
  });
};
// for the update one. this is protected route means only admin can change..
const updateCategory = async (slug, token, category) => {
  await axios.put(
    `${process.env.REACT_APP_ROUTE_ADMIN}/category/${slug}`,
    category,
    {
      headers: {
        token: token,
      },
    }
  );
};
// export all the function
module.exports = {
  updateCategory,
  getCategory,
  getCategoryNames,
  createCatetogy,
  removeCategory,
};
