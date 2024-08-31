import React, { useEffect, useState } from "react";
import InputField from "./InputField";
import "./App.css";
import axios from "axios";
import {
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdDeleteSweep,
} from "react-icons/md";

const Home = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios
      .get("https://todosmern-5.onrender.com/get")
      .then((result) => setTodos(result.data))
      .catch((err) => console.log(err));
  });

  const edithandler = (id) => {
    //editing todos
    axios
      .put("https://todosmern-5.onrender.com/update/" + id)
      .then((result) => {
        const updatedTodos = todos.map((todo) =>
          todo._id === id ? { ...todo, done: !todo.done } : todo
        );
        setTodos(updatedTodos);
      })
      .catch((err) => console.log(err));
  };

  const deleteHandler = (id) => {
    //delete handler
    axios
      .delete("https://todosmern-5.onrender.com/delete/" + id)
      .then((result) => {
        const updatedTodos = todos.filter((todo) => todo._id !== id);
        setTodos(updatedTodos);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="home">
      <h2 className="headingEle">Todo App</h2>
      <InputField />
      <br />
      {todos.length === 0 ? (
        <div>
          <h2 className="emptyHeading">
            No Todos are Available!! Pls Add Todos
          </h2>
        </div>
      ) : (
        todos.map((todo) => {
          return (
            <div className="task" key={todo._id}>
              <div className="checkbox" onClick={() => edithandler(todo._id)}>
                {todo.done ? (
                  <MdCheckBox className="icon"></MdCheckBox>
                ) : (
                  <MdCheckBoxOutlineBlank className="icon" />
                )}

                <p className={todo.done ? "line-through" : ""}>{todo.task}</p>
              </div>

              <div>
                <span>
                  <MdDeleteSweep
                    className="icon"
                    onClick={() => deleteHandler(todo._id)}
                  />
                </span>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Home;
