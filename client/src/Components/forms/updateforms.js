import React from "react";

const UpdateForm = ({ handleSubmit, OldName, NewName, SetNewName }) => {
  return (
    <div>
      <form action="" onSubmit={handleSubmit} className="form-group">
        <div className="mt-2">
          <input
            className="form-control"
            type="text"
            value={OldName}
            contentEditable="false"
            style={{ fontWeight: "bold", fontSize: "20px" }}
          />
        </div>

        <div className="mt-4">
          <input
            className="form-control"
            type="text"
            value={NewName}
            onChange={(e) => SetNewName(e.target.value)}
            autoFocus
            required
            placeholder="Enter name to be updated"
            style={{ fontWeight: "bold", fontSize: "20px" }}
          />
        </div>
        <br />
        <button className="btn btn-md btn-outline-success">Update</button>
      </form>
    </div>
  );
};

export default UpdateForm;
