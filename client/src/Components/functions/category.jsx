// in this folder i create all the curd operation of the category route lie delete,update,read,and create, that have added in backedn..
import axios from "axios";
// this is for creating category api..  this is protected routes so we need to send the toekn also

const createCatetogy = async (category, token) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_ROUTE_API}/category`,
      { name: category },
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

// for the get all the categroy this is not protected it can access by any one..
const getCategory = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_ROUTE_API}/categories`
    );
    return response;
  } catch (error) {
    throw error;
  }
};
// get category by names
const getCategoryNames = async (slug) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_ROUTE_API}/category/${slug}`
    );
    return response;
  } catch (error) {
    // console.log(error);
    throw error;
  }
};

// for the delete of category.
const removeCategory = async (slug, token) => {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_ROUTE_API}/category/${slug}`,
      {
        headers: {
          token: token,
        },
      }
    );

    return response;
  } catch (error) {
    throw error;
  }
};

// for the update one. this is protected route means only admin can change..
const updateCategory = async (slug, category, token) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_ROUTE_API}/category/${slug}`,
      { name: category }, // 2nd parameter is for the body
      {
        headers: {
          token: token,
        },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};
// this will give the subcategory based on the parent category id.
const getSubcategory = async (Id) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_ROUTE_API}/category/subcategory/${Id}`
    );
    return response; // Return the response data from the promise
  } catch (error) {
    throw error; // Re-throw the error to be caught in the calling code
  }
};

// export all the function
export {
  updateCategory,
  getCategory,
  getCategoryNames,
  createCatetogy,
  removeCategory,
  getSubcategory,
};
