import React from "react";
import UserSidebar from "../../Navbar/UserSidebar";
const UserDashBoard = () => {
  //   const [count, Setcount] = useState(5);
  //   useEffect(() => {
  //     let interval = setInterval(() => {
  //       Setcount((time) => --time);
  //     }, 1000);
  //     if (count === 0) {
  //       navigate("/");
  //     }
  //     return () => {
  //       clearInterval(interval);
  //     };
  //   });
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          <div className="col-md-2">
            <UserSidebar></UserSidebar>
          </div>
          <h1 className="text-center">User Dashboard</h1>
        </div>
      </div>
    </div>
  );
};

export default UserDashBoard;
