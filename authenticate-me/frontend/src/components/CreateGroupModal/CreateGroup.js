import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./CreateGroup.css";
import { addNewGroup } from "../../store/groups";

function CreateGroup() {
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const [name, setname] = useState("");
  const [location, setlocation] = useState("");
  const [description, setdescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name,
      location,
      organizerId: sessionUser.id,
      description,
    };

    const newGroup = await dispatch(addNewGroup(payload));
    history.push(`/group/${newGroup.id}`);
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
      </form>
    </div>
  );
}

export default CreateGroup;
