const mongoose = require("mongoose");
const express=require("express");
const app =express();
const port=3000;
const bodyParser=require("body-parser");
const cors=require("cors");
app.use(bodyParser.json());
app.use(cors());
mongoose.set("strictQuery", false);

const mongoDB = "mongodb+srv://adityakandpal2016:Tckandpal123@cluster0.hidiazt.mongodb.net/";
mongoose.connect(mongoDB);

const taskSchema = new mongoose.Schema({
    id: {type: Number},
    title: { type: String, required: true },
    description: { type: String, required: true },
  });
  const Task = mongoose.model('Task', taskSchema);


app.post('/todos',(req,res)=>{
  const { title,description } = req.body;
  const id=Math.floor(Math.random()*100)
  const obj = { id:id,title: title, description: description };
  const newTask = new Task(obj);
  newTask.save();
  res.json(newTask);
})

app.delete('/todos/:id',async(req,res)=>{
  var id=parseInt(req.params.id);
      Task.deleteOne({id:id}).then((result)=>{
        console.log(result);
      })
      const todo=await Task.find({});
      res.json(todo)
})

app.get('/todos',async(req,res)=>{
  const todo=await Task.find({});
  res.json(todo)
})


app.listen(port);

  