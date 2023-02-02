const express = require('express');
const mysql = require ('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Treehouse',
        database: 'business_db'
    },
    console.log(`Connected to the business_db database`)
);


// const initQuestions = [
//     {
//         type: 'list',
//         name: 'intro',
//         message: "Hello! What would you like to do?",
//         choices:["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role"]
//     },
// ];

// const managerQuestions = [
//     {
//         type:'input',
//         name: 'name',
//         message: "Please enter the manager's name:"
//     },
//     {
//         type: 'list',
//         name: 'whoNext',
//         message: "Would you like to add another employee?",
//         choices: ["Engineer", "Intern", "No, my team is complete"]
//     }
// ];

// const engineerQuestions = [
//     {
//         type:'input',
//         name: 'name',
//         message: "What is the engineer's name?"
//     },
//     {
//         type: 'list',
//         name: 'whoNext',
//         message: "Would you like to add another employee?",
//         choices: ["Engineer", "Intern", "No, my team is complete"]    }
// ];

// const internQuestions = [
//     {
//         type:'input',
//         name: 'name',
//         message: "What is the intern's name?"
//     },
//     {
//         type: 'list',
//         name: 'whoNext',
//         message: "Would you like to add another employee?",
//         choices: ["Engineer", "Intern", "No, my team is complete"]    }
// ];

db.query('SELECT COUNT(id) AS total_count FROM role GROUP BY department_id', function(err, results){
    console.log(results);
});