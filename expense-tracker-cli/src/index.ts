#!/usr/bin/env node

console.log("Welcome to the Expense Tracker CLI!");

const fs = require('fs');

const args = process.argv.slice(2);
console.log("Arguments:", args);
// console.log(args[1]);
const command = args[0];

const checkIfFileExists = fs.existsSync('expenses.json');

if (args.length === 0) {
  console.log("No command provided. Use 'add', 'list', or 'total'.");
  process.exit(1);
}

if(command === "add"){
  // const descriptionIndex = args.indexOf("--description") || args.indexOf("description");
  const descriptionIndex = args.indexOf("--description");
  // const amountIndex = args.indexOf("--amount") || args.indexOf("amount");
  const amountIndex = args.indexOf("--amount");
  
  const description: string | undefined = descriptionIndex !== -1 ? args[descriptionIndex + 1] : "";
  const amount: number = amountIndex !== -1 ? Number(args[amountIndex + 1]) : 0;
  
  if(!description || isNaN(amount) || amount <= 0){
    console.log("Invalid description or amount. Please provide valid values.");
    process.exit(1);
  }

  console.log("Adding a new expense...");
  console.log("Description", description);
  console.log("Amount", amount);


  if(!fs.existsSync('expenses.json')){
    // fs.writeFileSync('expenses.json', "[]"); // empty array. 
    fs.writeFileSync('expenses.json', JSON.stringify([])); 
  }

  const data = fs.readFileSync('expenses.json', 'utf-8');
  const expenses = JSON.parse(data)
  const expense = { 
    id: expenses.length + 1,
    description, 
    amount, 
    date: new Date().toISOString() 
  };
  expenses.push(expense);

  fs.writeFileSync('expenses.json', JSON.stringify(expenses, null, 2));

  // console.log("Expense added successfully! (ID:", expense.id, ")");
  console.log(`Expense added successfully! (ID: ${expense.id})`);

}

if(command === "list"){
  console.log("Listing all expenses...");

  if(!checkIfFileExists){
    console.log("No expenses found.");
    process.exit(0);
  }

  const data = fs.readFileSync('expenses.json', 'utf-8');
  const expenses = JSON.parse(data);
  if(expenses.length === 0){
    console.log("No expenses found.");
    process.exit(0);
  }
  // console.log(expenses);
  expenses.forEach((expense: { id: number; description: string; amount: number; date: string; }) => {
    const dateIndex = expense.date.indexOf('T');
    console.table(`ID: ${expense.id}, Description: ${expense.description}, Amount: $${expense.amount.toFixed(2)}, Date: ${expense.date.slice(0, dateIndex)}`);
  });
}

if(command === "summary"){
  if(!checkIfFileExists){
    console.log("No expenses found.");
    process.exit(0);
  }
  
  if(args.indexOf("--month") !== -1){
    console.log("Filtering by month...");
    const indexOfMonth = args.indexOf("--month");
    const month: number = indexOfMonth !== -1 ? Number(args[indexOfMonth + 1]) : 0;
    if(isNaN(month) || month < 1 || month > 12){
      console.log("Invalid month. Please provide a valid month (1-12).");
      process.exit(1);
    }
    console.log("Month:", month);

    const data = fs.readFileSync('expenses.json', 'utf-8');
    const expenses: { id: number, description: string, amount: number, date: Date }[] = JSON.parse(data);
    
    const filteredExpenses = expenses.filter((expense) => {
      const expenseDate = new Date(expense.date);
      return expenseDate.getMonth() + 1 === month; // getMonth() returns 0-11
    });

    if(filteredExpenses.length === 0){
      console.log(`No expenses found for month ${month}.`);
      process.exit(0);
    }

    const total = filteredExpenses.reduce((acc: number, expense: { amount: number; }) => acc + expense.amount, 0);
    console.log(`Total Expenses for month ${month}: $${total.toFixed(2)}`);
    process.exit(0);
  }
  
  console.log("Showing expense summary...");

  const data = fs.readFileSync('expenses.json', 'utf-8');
  const expenses = JSON.parse(data);
  if(expenses.length === 0){
    console.log("No expenses found.");
    process.exit(0);
  }

  const total = expenses.reduce((acc: number, expense: { amount: number; }) => acc + expense.amount, 0);
  console.log(`Total Expenses: $${total.toFixed(2)}`);
}

if(command === "delete"){ // expense-cli delete --id 2
  console.log("Deleting an expense...");

  const idIndex = args.indexOf("--id");
  const id: number = idIndex !== -1 ? Number(args[idIndex + 1]) : 0;

  if(id <= 0){
    console.log("Invalid ID. Please provide a valid expense ID.");
    process.exit(1);
  }

  if(!checkIfFileExists){
    console.log("No expenses found.");
    process.exit(0);
  }

  const data = fs.readFileSync('expenses.json', 'utf-8');
  const expenses = JSON.parse(data);
  const expenseIndex = expenses.filter((expense: { id: number; }) => expense.id === id);
  if (expenseIndex === -1) {
    console.log(`Expense with ID ${id} not found.`);
    process.exit(1);
  }
  const newExpenses = expenses.filter((expense: { id: number; }) => expense.id !== id);
  console.log(`Expense with ID ${id} deleted successfully.`);
  fs.writeFileSync('expenses.json', JSON.stringify(newExpenses, null, 2));
}