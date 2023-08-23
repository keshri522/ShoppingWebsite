import axios from "axios";
// this is for creating category api..  this is protected routes so we need to send the toekn also

const createProduct = async (product, token) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_ROUTE_API}/product`,
      product, //2nd parameter of axiox just for body
      {
        headers: {
          token: token,
        },
      }
    );
    return response; // Return the response data from the promise
  } catch (error) {
    throw error; // Re-throw the error to be caught in the calling code
  }
};
// create endpoint to get the product in the admin dashboard in terms of paginations..
const getProductList = async (count) => {
  try {
    const get = await axios.get(
      // not here count is the number in which we use pagination in database. to set the limit
      `${process.env.REACT_APP_ROUTE_API}/products/${count}`,
      { count: count }
      //2nd parameter of axiox just for body
    );
    return get;
  } catch (error) {
    throw error;
  }
};
// deleting the products
const ProductDelete = async (slug, token) => {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_ROUTE_API}/deleteProducts/${slug}`,

      {
        headers: {
          token: token,
        },
      }
    );
    return response; // Return the response data from the promise
  } catch (error) {
    throw error; // Re-throw the error to be caught in the calling code
  }
};
// get the single product list based on the slug..
const getSingleProduct = async (slug) => {
  try {
    const response = await axios.get(
      // not here count is the number in which we use pagination in database. to set the limit
      `${process.env.REACT_APP_ROUTE_API}/product/${slug}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};
const updateProducts = async (product, token, slug) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_ROUTE_API}/product/${slug}`,
      product, //2nd parameter of axiox just for body
      {
        headers: {
          token: token,
        },
      }
    );
    return response; // Return the response data from the promise
  } catch (error) {
    throw error; // Re-throw the error to be caught in the calling code
  }
};

// get the single product list based on the slug..
const getTotalProduct = async () => {
  try {
    const response = await axios.get(
      // not here count is the number in which we use pagination in database. to set the limit
      `${process.env.REACT_APP_ROUTE_API}/products/total`
    );
    return response;
  } catch (error) {
    throw error;
  }
};
// this is for the pagination in the frontend to show the data based on the page nubmber.

const getPaginationProducts = async (sort, order, page) => {
  try {
    const get = await axios.post(
      // not here count is the number in which we use pagination in database. to set the limit
      `${process.env.REACT_APP_ROUTE_API}/products/pagination/`,
      { sort: sort, order: order, page: page }
      //2nd parameter of axiox just for body
    );
    return get;
  } catch (error) {
    throw error;
  }
};
// post the search to the routes
const fetchSearch = async (arg) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_ROUTE_API}/search/filter`,
      arg //2nd parameter of axiox just for body
    );
    return response; // Return the response data from the promise
  } catch (error) {
    throw error; // Re-throw the error to be caught in the calling code
  }
};

export {
  getProductList,
  createProduct,
  ProductDelete,
  getSingleProduct,
  updateProducts,
  getTotalProduct,
  getPaginationProducts,
  fetchSearch,
};
