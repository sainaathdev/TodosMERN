import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { FaPlus } from "react-icons/fa";

const InputField = () => {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    axios
      .get("https://todosmern-lat-backend.onrender.com/tasks")
      .then((response) => setTaskList(response.data))
      .catch((err) => console.log(err));
  }, []);
  const addHandler = (event) => {
    event.preventDefault();

    if (task.trim() === "") {
      alert("Enter Valid Text");
      return;
    }

    axios
      .post("https://todosmern-lat-backend.onrender.com/add", { task: task })
      .then((response) => {
        setTaskList([...taskList, response.data]);
        setTask("");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <input
        type="text"
        id="inputEle"
        className="inputF"
        value={task}
        placeholder="Enter Your Task"
        onChange={(e) => setTask(e.target.value)}
      />
      <button className="btn btn-primary" onClick={addHandler} type="button">
        <FaPlus className="plus"></FaPlus>
      </button>
    </div>
  );
};

export default InputField;
