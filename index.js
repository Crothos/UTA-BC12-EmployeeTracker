
const mysql = require('mysql2');
const inquirer = require("inquirer");
const conTable = require("console.table")

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'AngryCuddle5',
    database: 'employee_db'
  },
  console.log(`Connected to the employee database.`)
);

const promptUser = () => {
    inquirer.prompt([
      {
      type: 'list',
      name: 'choices',
      message: 'Choose an option.',
      choices: [
        'View All Employees',
        'Add Employee',
        'Update Employee Role',
        'View All Roles',
        'Add Role',
        'View All Departments',
        'Add Department',
        'Quit'
      ]}
    ])
    .then((answers) => {
      const {choices} = answers;
      if (choices === 'View All Employees') {
        displayEmployees();
      }
      if (choices === 'Add Employee') {
        addEmployee();
      }
      if (choices === 'Update Employee Role') {
        UpdateEmployee();
      }
      if (choices === 'View All Roles') {
        displayRoles();
      }
      if (choices === 'Add Role') {
        addRole();
      }
      if (choices === 'View All Departments') {
        displayDepartments();
      }
      if (choices === 'Add Department') {
        addDepartment();
      }
      if (choices === 'Quit') {
        goodBye();
      }
    })
}





 const init = () => {
    console.log("///////////////////////////////////"),
    console.log("/                                 /"),
    console.log("/           WELCOME TO            /"),
    console.log("/        EMPLOYEE TRACKER         /"),
    console.log("/                                 /"),
    console.log("///////////////////////////////////"),
    promptUser()
    };

init();

const goodBye = () => {
  console.log("///////////////////////////////////"),
  console.log("/                                 /"),
  console.log("/            GOODBYE!             /"),
  console.log("/                                 /"),
  console.log("///////////////////////////////////")
};