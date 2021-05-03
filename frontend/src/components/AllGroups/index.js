import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGroups } from "../../store/groups";
import { Link } from "react-router-dom";
import "./AllGroups.css";

export default function AllGroups() {
  const dispatch = useDispatch();
  const [numGroups, setNumGroups] = useState(10);
  const groups = useSelector((state) => state.group.groups);

  useEffect(() => {
    dispatch(getGroups());
  }, [dispatch]);

  if (!groups) return null;

  return (
    <div className="all-groups-page">
      <h1>All Groups</h1>
      <div className="all-groups-container">
        {groups.slice(0, numGroups).map((group, i) => (
          <Link key={i} to={`/group/${group.id}`}>
            <div className="user-groups-row">
              <img alt="" src={group.image} />
              <div className="user-row-text">
                <div className="user-row-header">
                  <h4 className="user-row-time">{group.location}</h4>
                </div>
                <h3>{group.name}</h3>
                <h4 className="user-row-body">{group.description}</h4>
              </div>
            </div>
          </Link>
        ))}
        <div className="load-container">
          {groups.length > numGroups && (
            <div
              className="load-more"
              onClick={() => setNumGroups(numGroups + 10)}
            >
              Load More
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
