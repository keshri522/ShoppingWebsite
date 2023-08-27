import React from "react";
import { Drawer, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import laptop from "../pages/auth/download.png";
import { changeState } from "../Redux/reducers/drawerreducers";
const SideDrawer = () => {
  const dispatch = useDispatch();
  const bolleanState = useSelector((state) => state.rootreducer.statechange); // get the state true from redux state
  const Cart = useSelector((state) => state.rootreducer.cart);
  // inline css style
  const imagestyle = {
    width: "100%",
    height: "100px",
    objectFit: "cover",
  };
  // this functio will count the total money
  const gettotalPrice = () => {
    let add = 0;
    let price = Cart.map((item) => {
      let c = item.price * item.count;
      add += c;
    });
    return add;
  };
  return (
    <Drawer
      className="text-center"
      title={`Cart  ${Cart.length} Products`}
      closable={false}
      placement="left"
      onClose={() => {
        dispatch(changeState(false));
      }}
      open={bolleanState}
    >
      {/* {Cart?.map((item) => (
        <div className="row">
          <div className="col ">
            {item.images.length ? (
              <>
                <img
                  className="mt-3"
                  src={item.images[0].url}
                  style={imagestyle}
                ></img>
                <p className="text-center text-ligh bg-secondary mb-4 font-weight-bold">
                  {" "}
                  {item.title} x {item.count}=${item.count * item.price}
                </p>
              </>
            ) : (
              <>
                <img src={laptop} style={imagestyle}></img>
                <p className="text-center text-ligh bg-secondary font-weight-bold">
                  {" "}
                  {item.title} x {item.count}=${item.count * item.price}
                </p>
              </>
            )}
          </div>
        </div>
      ))} */}
      {Cart?.length ? (
        Cart.map((item) => (
          <div className="row" key={item._id}>
            <div className="col">
              {item.images.length ? (
                <>
                  <img
                    className="mt-3"
                    src={item.images[0].url}
                    style={imagestyle}
                    alt={item.title}
                  />
                  <p className="text-center text-light bg-secondary mb-4 font-weight-bold">
                    {item.title} x {item.count}=${item.count * item.price}
                  </p>
                </>
              ) : (
                <>
                  <img src={laptop} style={imagestyle} alt={item.title} />
                  <p className="text-center text-light bg-secondary font-weight-bold">
                    {item.title} x {item.count}=${item.count * item.price}
                  </p>
                </>
              )}
            </div>
          </div>
        ))
      ) : (
        <p>Your cart is empty.</p>
      )}

      <Link to="/cart">
        <button
          style={{ width: "50%" }}
          className="btn btn-sm btn-success "
          onClick={() => {
            dispatch(changeState(false)); // becasue want to close the side drawer
          }}
        >
          Go to Cart
        </button>
      </Link>
    </Drawer>
  );
};

export default SideDrawer;
