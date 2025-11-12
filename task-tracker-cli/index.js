#!/usr/bin/env node

console.log("WELCOME TO TASK TRACKER CLI");

const fs = require("fs");

// check if file exists
if (fs.existsSync("tasks.json")) {
//   console.log("tasks.json exists");
} else {
  fs.writeFileSync("tasks.json", "[]");
}

const args = process.argv.slice(2); // removes node and index.js
const command = args[0];
// const task = args[1]; // task description may have spaces eg Code javascript CLI

// if there's no task

if (command === "add") {
//   const task = args.slice(1).join(" ");
  const task = args[1] || args.slice(1).join(" "); // to handle words in " " and words without " "
  if (!task) {
    console.log("Please provide a task description.");
    return;
  }
  const data = JSON.parse(fs.readFileSync("tasks.json", "utf-8"));
  // console.log(data)
  const newData = {
    id: data.length + 1,
    description: task,
    status: "todo", // || "in-progress" || "done" || "todo"
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  data.push(newData);
  fs.writeFileSync("tasks.json", JSON.stringify(data, null, 2));
  console.log(`Task added successfully with ID: ${newData.id}`);
}

if (command === "list") {
    const argsStatus = args[1];
    const data = JSON.parse(fs.readFileSync("tasks.json", "utf-8"));
    if(argsStatus === "todo"){
        // const data
        const filteredData = data.filter(task => task.status === "todo");
        console.log(filteredData);
        return;
    }
    if(argsStatus === "in-progress"){
        const filteredData = data.filter(task => task.status === "in-progress");
        console.log(filteredData);
        return;
    }
    if(argsStatus === "done"){
        const filteredData = data.filter(task => task.status === "done");
        console.log(filteredData);
        return;
    }
    console.log(data);
}

if(command === "delete"){
    // get the id.
    const id = args[1];
    if(!id){
        console.log("Please provide a task ID to delete.");
        return;
    }

    const data = JSON.parse(fs.readFileSync("tasks.json", "utf-8"));
    // checking if id exists
    const taskIndex = data.findIndex(task => task.id == id);
    if(taskIndex === -1){
        console.log(`Task with ID: ${id} not found.`);
        return;
    }
    const newData = data.filter(task => task.id != id);
    fs.writeFileSync("tasks.json", JSON.stringify(newData, null, 2));
    console.log(`Task with ID: ${id} deleted successfully.`);
}

if(command === "update"){
    const id = args[1];
    const newDescription = args.slice(2).join(" ") || args[2]; // to handle words in " " and words without " "

    if(!id || !newDescription){
        console.log("Please provide a task ID and new description to update.");
        return;
    }

    const data = JSON.parse(fs.readFileSync("tasks.json", "utf-8"));
    const taskIndex = data.findIndex(task => task.id == id);

    if(taskIndex === -1){
        console.log(`Task with ID: ${id} not found.`);
        return;
    }
    // console.log(taskIndex);
    data[taskIndex].description = newDescription;
    data[taskIndex].updatedAt = new Date().toISOString();

    fs.writeFileSync("tasks.json", JSON.stringify(data, null, 2));
    console.log(`Task with ID: ${id} updated successfully.`);
}

// update task status to in-progress
if(command === "mark-in-progress"){
    const id = args[1];

    if(!id){
        console.log("Please provide a task ID to mark as in-progress.");
        return;
    }

    const data = JSON.parse(fs.readFileSync("tasks.json", "utf-8"));
    const taskIndex = data.findIndex(task => task.id == id); 
    if(taskIndex === -1){
        console.log(`Task with ID: ${id} not found.`);
        return;
    }
    data[taskIndex].status = "in-progress";
    data[taskIndex].updatedAt = new Date().toISOString();

    fs.writeFileSync("tasks.json", JSON.stringify(data, null, 2));
    console.log(`Task with ID: ${id} marked as in-progress successfully.`);
}

// update task status to done
if(command === "mark-done"){
    const id = args[1];

    if(!id){
        console.log("Please provide a task ID to mark as done.");
        return;
    }

    const data = JSON.parse(fs.readFileSync("tasks.json", "utf-8"));
    const taskIndex = data.findIndex(task => task.id == id);
    if(taskIndex === -1){
        console.log(`Task with ID: ${id} not found.`);
        return;
    }

    data[taskIndex].status = "done";
    data[taskIndex].updatedAt = new Date().toISOString();
    
    fs.writeFileSync("tasks.json", JSON.stringify(data, null, 2));
    console.log(`Task with ID: ${id} marked as done successfully.`);
}


const data = JSON.parse(fs.readFileSync("tasks.json", "utf-8"));
fs.writeFileSync("tasks.json", JSON.stringify(data, null, 2));
