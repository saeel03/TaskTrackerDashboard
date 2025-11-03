import React, { useState, useEffect } from "react";
import { createTask, updateTask } from "../services/taskService";
import { Button, Form } from "react-bootstrap";

const TaskForm = ({ editingTask, onSaved }) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "Pending",
    priority: "Medium",
    due_date: "",
  });

  useEffect(() => {
  if (editingTask) {
    
    setTask({
      id: editingTask.id,
      title: editingTask.title || "",
      description: editingTask.description || "",
      status: editingTask.status || "Pending",
      priority: editingTask.priority || "Medium",
      due_date: editingTask.due_date || "",
    });
  } else {
    
    setTask({
      title: "",
      description: "",
      status: "Pending",
      priority: "Medium",
      due_date: "",
    });
  }
}, [editingTask]);


  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (task.id) {
  console.log("Updating task:", task); // debug log
  await updateTask(task.id, task);
} else {
      console.log("Creating new task:", task);
      await createTask(task);
    }

    onSaved(); // refresh list + close modal
  } catch (error) {
    console.error("Error while saving task:", error);
  }
};


  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-2">
          <Form.Label>Title</Form.Label>
          <Form.Control
            name="title"
            value={task.title}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Description</Form.Label>
          <Form.Control
            name="description"
            value={task.description}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Status</Form.Label>
          <Form.Select
            name="status"
            value={task.status}
            onChange={handleChange}
          >
            <option>Pending</option>
            <option>Done</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Priority</Form.Label>
          <Form.Select
            name="priority"
            value={task.priority}
            onChange={handleChange}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Due Date</Form.Label>
          <Form.Control
            type="date"
            name="due_date"
            value={task.due_date?.slice(0, 10) || ""}
            onChange={handleChange}
          />
        </Form.Group>

        <Button type="submit" variant="primary" className="w-100">
          {task.id ? "Update Task" : "Add Task"}
        </Button>
      </Form>
    </div>
  );
};

export default TaskForm;
