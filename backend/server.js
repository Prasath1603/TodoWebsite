const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


const todoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    completed: { type: Boolean, required: true }
});

const TodoModel = mongoose.model("Todo", todoSchema);


app.get('/todos', async (req, res) => {
    const todos = await TodoModel.find();
    res.json(todos);
});

app.post('/todos', async (req, res) => {
    const newTodo = new TodoModel(req.body);
    await newTodo.save();
    res.json(newTodo);
});

app.put('/todos/:id', async (req, res) => {
    const updatedTodo = await TodoModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTodo);
});

app.delete('/todos/:id', async (req, res) => {
    await TodoModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted Successfully" });
});



app.listen(5000, () => console.log("Server running on port 5000"));
