const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/User");
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
    completed: { type: Boolean, required: true },
    userId : { type : mongoose.Schema.Types.ObjectId , ref : "User" , required : true}
});

const TodoModel = mongoose.model("Todo", todoSchema);


app.get('/todos/:userId', async (req, res) => {
    const todos = await TodoModel.find({userId : req.params.userId});
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

//Login and Signup activities
app.post("/login" , async (req , res) =>{
    const {username , password} = req.body;
    const user = await User.findOne({username , password});
    if(user){
        res.json({message : "Login successfull" , user});
    }
    else{
        res.status(401).json({error : "Invalid Credentials"});
    };
});

app.post("/signup", async (req, res) => {
    const { username, password } = req.body;
  
    try {
   
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ error: "Username already exists" });
      }

      const newUser = new User({ username, password });
      await newUser.save();
      res.status(201).json({ message: "User registered successfully!" , user : newUser} );
    } catch (err) {
      res.status(500).json({ error: "Registration failed" });
    }
  });
  
app.listen(5000, () => console.log("Server running on port 5000"));
