"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get("/api/get-todo");
        setTodos(response.data.todos);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    fetchTodos();
  }, []);

  const onSubmit = async () => {
    let data = JSON.stringify({
      title: title,
      description: description,
    });

    try {
      if (title !== "" && description !== "") {
        const response = await axios.post(
          "http://localhost:3000/api/add-todo",
          data,
          { headers: { "Content-Type": "application/json" } }
        );
        console.log(response);
        setTodos((prevTodos) => [...prevTodos, response.data]);
        setTitle("");
        setDescription("");
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        alert("Title and description cannot be empty");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add todo");
    }
  };

  const DeleteTodo = async (index) => {
    const id = todos[index].id;
    try {
      await axios.delete(`/api/delete-todo/${id}`);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const HandleDone = async (id, isdone) => {
    try {
      const response = await axios.put(`/api/update-todo/${id}`, { isdone });
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, isdone: response.data.isdone } : todo
        )
      );
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  return (
    <div>
      <h1 className="mt-2 flex justify-center font-bold text-2xl border bg-black text-white">
        Todo Application
      </h1>
      {success && (
        <div className="font-bold text-green-600">
          Todo is added successfully
        </div>
      )}
      <div>
        <span className="flex font-bold text-2xl">Enter Todo</span>
        <input
          className="mt-4 border-2 rounded-lg w-full p-2"
          type="text"
          placeholder="Enter Task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <br />
        <span className="flex font-bold text-2xl">Enter Description</span>
        <input
          className="mt-4 border-2 rounded-lg w-full p-2"
          type="text"
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />
        <br />
        <button
          className="mt-4 p-4 bg-black text-white px-4 py-2 rounded-lg"
          onClick={onSubmit}
        >
          Add Todo
        </button>
      </div>
      <div>
        <table>
          <thead>
            <tr className="">
              <th>Task</th>
              <th>Description</th>
              <th>Mark</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo, index) => (
              <tr key={index}>
                <td>{todo.title}</td>
                <td>{todo.description}</td>
                <td className="py-2 px-4 flex space-x-2">
                  <button
                    onClick={() => HandleDone(index)}
                    className="bg-gray-500 text-white px-2 rounded cursor-pointer"
                  >
                    {todo.isdone ? "Undo" : "Done"}
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => DeleteTodo(index)}
                    className="bg-red-500 text-white px-2 rounded cursor-pointer"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
