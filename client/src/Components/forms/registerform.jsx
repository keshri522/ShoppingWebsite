import React from "react";
import { MailOutlined } from "@ant-design/icons";
import { Button } from "antd";
const Registerform = ({ handleSubmit, email, setEmail }) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="form-control "
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
          placeholder="Enter your email address"
        />

        <Button
          onClick={handleSubmit}
          type="primary"
          size="middle"
          icon={<MailOutlined />}
          block
          shape="round"
          className="mt-4"
          disabled={!email}
        >
          Registe with email
        </Button>
      </form>
    </div>
  );
};

export default Registerform;
