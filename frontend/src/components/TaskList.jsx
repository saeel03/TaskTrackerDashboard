import React, { useEffect, useState } from "react";
import { getTasks, deleteTask } from "../services/taskService";
import { Button, Table, Form } from "react-bootstrap";

const TaskList = ({ onEdit, refresh }) => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState({ status: "", priority: "" });

  //Fetch tasks from backend 
  const fetchTasks = async () => {
    try {
      const res = await getTasks(filter);
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  // 🗑️ Delete a task
  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      fetchTasks(); // refresh after deletion
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  // Fetch tasks on load + when refresh prop changes
  useEffect(() => {
    fetchTasks();
  }, [refresh]);

  return (
    <div className="mt-4">
      <h4 className="mb-3">Tasks</h4>

      {/* Filters */}
      <Form className="mb-3 d-flex align-items-center">
        <Form.Select
          className="me-2"
          value={filter.status}
          onChange={(e) => setFilter({ ...filter, status: e.target.value })}
        >
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Done">Done</option>
        </Form.Select>

        <Form.Select
          className="me-2"
          value={filter.priority}
          onChange={(e) => setFilter({ ...filter, priority: e.target.value })}
        >
          <option value="">All Priorities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </Form.Select>

        <Button variant="primary" onClick={fetchTasks}>
          Apply Filters
        </Button>
      </Form>

      {/* Task Table */}
      <Table striped bordered hover responsive>
        <thead className="table-light">
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Due Date</th>
            <th style={{ width: "140px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length > 0 ? (
            tasks.map((t) => (
              <tr key={t.id}>
                <td>{t.title}</td>
                <td>{t.description || "-"}</td>
                <td>{t.status}</td>
                <td>{t.priority}</td>
                <td>{t.due_date?.slice(0, 10)}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => {
                      console.log("Editing task:", t); 
                      onEdit(t); 
                    }}
                    className="me-2"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(t.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center text-muted">
                No tasks found
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default TaskList;
