import React from "react";

const Categoryfrom = ({ handleSubmit, Setname, name }) => {
  return (
    <div>
      <form action="" onSubmit={handleSubmit} className="form-group">
        <input
          className="form-control"
          type="text"
          value={name}
          onChange={(e) => Setname(e.target.value)}
          autoFocus
          required
          placeholder="Add new category"
        />
        <br />
        <button className="btn btn-md btn-outline-success" disabled={!name}>
          Create
        </button>
      </form>
    </div>
  );
};

export default Categoryfrom;
