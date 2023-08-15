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
export default createProduct;
