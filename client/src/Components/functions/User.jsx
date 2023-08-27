// in this folder i create all the curd operation of the category route lie delete,update,read,and create, that have added in backedn..
import axios from "axios";
// this is for creating category api..  this is protected routes so we need to send the toekn also

const UserCartData = async (cart, token) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_ROUTE_API}/user/cart`,
      { cart: cart }, // 2nd parameter for the body
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
const Getusercart = async (token) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_ROUTE_API}/user/cart`,

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
// this will remove cart item from database when user clicked on empty cart
const EmptyCart = async (token) => {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_ROUTE_API}/user/cart`,

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
// this will send the address to backend
const UserAddress = async (address, token) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_ROUTE_API}/user/address`,
      { address: address },

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
// this function will return all the or get all the carts items
const GetallCarts = async (token) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_ROUTE_API}/user/allcart`,

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
export { Getusercart, UserCartData, EmptyCart, UserAddress, GetallCarts };
