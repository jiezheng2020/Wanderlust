import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import CreateGroup from "./CreateGroup";
import "./CreateGroup.css";

function CreateGroupModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="start-group-btn" onClick={() => setShowModal(true)}>
        Start a new Group
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateGroup />
        </Modal>
      )}
    </>
  );
}

export default CreateGroupModal;
