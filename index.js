const express=require("express");
const app =express();
const port=3000;
const bodyParser=require("body-parser");
const cors=require("cors");
app.use(bodyParser.json());
app.use(cors());
//post,put,get,delete
let todo=[];

const findInd = (id)=>{
    for(var i=0;i<todo.length;i++){
        if(todo[i].id==id){
            return i;
        }
    }
    return -1;
}

const deleteInd=(ind)=>{
    let todo2=[];
    for(var i=0;i<todo.length;i++){
        if(i!=ind){
            todo2.push(todo[i]);
        }
    }
    return todo2;
}
//post a new todo
app.post('/todos',(req,res)=>{
    const newTodo={
        id:Math.floor(Math.random()*100),
        title:req.body.title,
        description:req.body.description
    };
    todo.push(newTodo);
    res.json(newTodo);
})
//delete a todo
app.delete('/todos/:id',(req,res)=>{
    var id=parseInt(req.params.id);
    var ind=findInd(id);
    console.log(ind);
    if(ind==-1){
        res.send("Invalid Response!");
    }
    else{
        todo=deleteInd(ind);
        res.json(todo);
    }
})
//print the todos
app.get('/todos',(req,res)=>{
    res.json(todo);
})

app.listen(port);