import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import "../assets/Dashboard.css";

const Dashboard = () => {
  const [editingTask, setEditingTask] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleSaved = () => {
    setRefresh(!refresh);
    setEditingTask(null);
    setShowModal(false); // Close popup
  };

  const handleAddClick = () => {
    setEditingTask(null);
    setShowModal(true);
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-header">Task Tracker Dashboard</h2>

      {/* Top Buttons */}
      <div className="dashboard-buttons">
        <Button variant="success" onClick={handleAddClick}>
          Add Task
        </Button>
        <Button
          variant="outline-success"
          onClick={() =>
            window.open("http://localhost:5000/api/tasks/export")
          }
        >
          Download CSV
        </Button>
      </div>

      {/* Task List */}
      <TaskList
        refresh={refresh}
        onEdit={(task) => {
          console.log("Editing task:", task);
          setEditingTask(task);
          setShowModal(true);
        }}
      />

      {/* Modal Popup for Add/Edit Task */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        contentClassName="dark-modal" 
      >
        <Modal.Header closeButton className="dark-modal-header">
          <Modal.Title>
            {editingTask ? "Edit Task" : "Add New Task"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="dark-modal-body">
          <TaskForm editingTask={editingTask} onSaved={handleSaved} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Dashboard;
