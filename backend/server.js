const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const TodoModel = require("./Models/Todo.model");

const app = express();
app.use(cors());
app.use(express.json());

app.use(cors({
  origin: 'https://66d348c162742642c8af06e4--sage-treacle-178c00.netlify.app', // replace with your frontend URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // if you need to include cookies
}));

mongoose.connect("mongodb://127.0.0.1:27017/test");  //mongoDB compass 

app.post("/add", (req, res) => {
  const task = req.body.task;
  TodoModel.create({
    task: task,
  })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.get("/get", (req, res) => {
  TodoModel.find() //find all records
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.put("/update/:id", (req, res) => {
  const { id } = req.params;
  TodoModel.findByIdAndUpdate({ _id: id }, { done: true })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  TodoModel.findByIdAndDelete({ _id: id })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.listen(4000, () => {
  console.log(`server running`);
});
