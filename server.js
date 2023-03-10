const fs = require('fs');
const inquirer = require('inquirer');
const express = require('express');
const mysql = require ('mysql2');
const cTable = require('console.table');
const { title } = require('process');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Treehouse',
        database: 'business_db',
        rowsAsArray: true
    },
    console.log(`Connected to the business_db database`)
);


const initQuestions = [
    {
        type: 'list',
        name: 'intro',
        message: "Hello! What would you like to do?",
        choices:["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role"]
    },
];

let choices = [];

const addDeptQs = [
    {
        type:'input',
        name: 'dept_name',
        message: "What department would you like to add?"
    },
];

const addRoleQs = [
    {
        type:'input',
        name: 'title',
        message: "What role would you like to add?"
    },
    {
        type:'input',
        name: 'salary',
        message: "How much does this role earn?"
    },
    {
        type:'list',
        name: 'name',
        message: "What department will this role be in?",
        choices,
    }
];

const addEmplQs = [
    {
        type:'input',
        name: 'first_name',
        message: "What is the employee's first name?"
    },
    {
        type:'input',
        name: 'last_name',
        message: "What is the employee's last name?"
    },
    {
        type:'list',
        name: 'role_name',
        message: "What role will this employee have?",
        choices,
    },
    {
        type:'list',
        name: 'manager_id',
        message: "Who will be this employee's manager?",
        choices: [2, 4, 6, 10, 12, 13, 14, 15]
    },
];

// Load choices array with list of departments from department table
function prepRoleQuestions(){
    const dept_name = db.query('SELECT DISTINCT name FROM department;', 
    function (err, results){
        results.forEach(element => {
            element.forEach(item => {
            choices.push(item)
        });
        });
        if(err){
            console.log(err)
        }
        })
}

// Load choices array with list of titles from role table
function prepEmployeeQuestions(){
    // let choices = []
    const role_id = db.query('SELECT title FROM role ORDER BY id',
    function (err, results){
        results.forEach(element => {
            element.forEach(item => {
            choices.push(item)
        });
        });
        })
}
// Handles response suite from Initial Questions. Response is an object generated by Inquirer.prompt via ask(initQuestions)
function initSwitch(response){
    switch(response.intro){
        case "View all departments": 
        db.query('SELECT * FROM department',function(err, results){
            console.table(results)});   
        ask(initQuestions);
        break;
        case "View all roles": 
        db.query('SELECT * FROM role',   function(err, results){
            console.table(results);
        }); 
        ask(initQuestions);
        break;
        case "View all employees": 
        db.query('SELECT * FROM employee',   function(err, results){
            console.table(results);
        }); 
        ask(initQuestions);
        break;
        case "Add a department": 
            ask(addDeptQs)
        break;
        case "Add a role": 
            prepRoleQuestions()
            ask(addRoleQs)
        break;
        case "Add an employee": 
            prepEmployeeQuestions()
            ask(addEmplQs)
        break;
        case "Update an employee role": 
        console.log("case 7");
        break;
        default:
            console.log("Something is up with the switch")
}};

// Inserts inquirer response into SQL database
function add_Department(response){
    const { dept_name } = response
    db.query(`INSERT INTO department (name) VALUES("${dept_name}");`)
    console.log("Department added!");
    ask(initQuestions)
};

// Inserts inquirer response into SQL database
function add_Role(response){
    const { title, salary, name } = response
    db.query(`SELECT id FROM department WHERE name= "${name}";`, function(err, results){
        // Results returns an array in an array; current solution is two forEach loops
        results.forEach(element => {
            element.forEach(item => {
                const department_id = item
                db.query(`INSERT INTO role (title, salary, department_id) VALUES("${title}", "${salary}", "${department_id}");`)
            })
        })
        if(err){console.log(err)}
    })

    console.log("Role added!");
    ask(initQuestions)
};

// Inserts inquirer response into SQL database
function add_Employee(response){
    const { first_name, last_name, role_name, manager_id } = response
    db.query(`SELECT id FROM role WHERE title= "${role_name}";`,function(err,results){
        // Results returns an array in an array; current solution is two forEach loops
        results.forEach(element => {
            element.forEach(item => {
                const role_id = item;
                db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES("${first_name}", "${last_name}", "${role_id}","${manager_id}");`)
            })
        })
        if(err){console.log(err)}
    })
    console.log("Employee added!")
    ask(initQuestions)
};

// function updateEmployee(); ran out of time, will finish someday!

// Handler for inquirer.prompt feature; directs question arrays and organizes actions based on responses
function ask(array) {
    inquirer.prompt(array)
    .then((response) => {
        if(array === initQuestions){
            initSwitch(response)}
        else if(response.dept_name){
            add_Department(response)
        }else if(response.title){
            add_Role(response);
        }else{
            add_Employee(response);
        }
        return;
    })
};

function init(){
    db;
    ask(initQuestions);
};

app.use((req, res) => {
    res.status(404).end();
})
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})

init();
