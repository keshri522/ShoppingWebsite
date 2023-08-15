import React from "react";
import { Link } from "react-router-dom";
import { MailOutlined, GoogleOutlined } from "@ant-design/icons";
import { Button } from "antd";
const Loginform = ({
  handleSubmit,
  email,
  setEmail,
  password,
  setPassword,
  googleLogin,
}) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            className="form-control "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
            placeholder="Enter your email address"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>
        <Button
          onClick={handleSubmit}
          type="primary"
          size="large"
          icon={<MailOutlined />}
          block
          shape="round"
          className="mt-2"
          disabled={!email || password.length < 6}
        >
          Login with email/password
        </Button>

        <Button
          onClick={googleLogin}
          size="large"
          icon={<GoogleOutlined />}
          block
          shape="round"
          className="mt-4 bg-warning"
        >
          Login with Google
        </Button>

        <Link
          to="/forgot/password"
          className="float-right text-danger mt-2 text-decoration-none font-weight-bold"
        >
          forgot password
        </Link>
      </form>
    </div>
  );
};

export default Loginform;
