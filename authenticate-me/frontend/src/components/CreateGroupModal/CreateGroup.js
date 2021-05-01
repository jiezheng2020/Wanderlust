import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import "./CreateGroup.css";

function CreateGroup() {
  const dispatch = useDispatch();
  const [name, setname] = useState("");
  const [location, setlocation] = useState("");
  const [description, setdescription] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="create-group-page">
      <form onSubmit={handleSubmit}>
        <div className="create-group-box">
          <label className="start-group-label">Start a New Group Today!</label>
          <div className="create-group-fields">
            <label>Name</label>
            <input
              className="create-group-input"
              type="text"
              value={name}
              onChange={(e) => setname(e.target.value)}
              required
            />
            <label>Location</label>
            <input
              className="create-group-input"
              type="text"
              value={location}
              onChange={(e) => setlocation(e.target.value)}
              required
            />
            <label>Description</label>
            <textarea
              className="create-group-input"
              type="text"
              value={description}
              onChange={(e) => setdescription(e.target.value)}
              required
            />
          </div>
          <button className="start-group-btn" type="submit">
            Create Group
          </button>
        </div>
        <div className="create-group-errors">
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
        </div>
      </form>
    </div>
  );
}

export default CreateGroup;
