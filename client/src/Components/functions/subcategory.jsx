// in this folder i create all the curd operation of the category route lie delete,update,read,and create, that have added in backedn..
import axios from "axios";
// this is for creating category api..  this is protected routes so we need to send the toekn also

const createsubcategory = async (category, token, parentId) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_ROUTE_API}/subcategory`,
      { name: category, parent: parentId },
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
const getsubcategory = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_ROUTE_API}/subcategories`
    );
    return response;
  } catch (error) {
    throw error;
  }
};
// get category by names
const getsubcategorynames = async (slug) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_ROUTE_API}/subcategory/${slug}`
    );
    return response;
  } catch (error) {
    // console.log(error);
    throw error;
  }
};

// for the delete of category.
const removesubcategory = async (slug, token) => {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_ROUTE_API}/subcategory/${slug}`,
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
const updatesubcategory = async (slug, category, token) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_ROUTE_API}/subcategory/${slug}`,
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

// export all the function
export {
  updatesubcategory,
  getsubcategory,
  getsubcategorynames,
  createsubcategory,
  removesubcategory,
};
