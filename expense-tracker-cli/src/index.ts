#!/usr/bin/env node

console.log("Welcome to the Expense Tracker CLI!");

const args = process.argv.slice(2);
console.log("Arguments:", args);
// console.log(args[1]);
const command = args[0];

if (args.length === 0) {
  console.log("No command provided. Use 'add', 'list', or 'total'.");
  process.exit(1);
}

if(command === "add"){
    console.log("Adding a new expense...");
    const descriptionIndex = args.indexOf("--description");
    const amountIndex = args.indexOf("--amount");

    const description: string | undefined = descriptionIndex !== -1 ? args[descriptionIndex + 1] : "";
    const amount: number = amountIndex !== -1 ? Number(args[amountIndex + 1]) : 0;

    console.log("Description", description);
    console.log("Amount", amount);

    if(!description || isNaN(amount) || amount <= 0){
        console.log("Invalid description or amount. Please provide valid values.");
        process.exit(1);
    }

    console.log("should not run")
}