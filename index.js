// Connection Info
const mysql = require('mysql2');
const inquirer = require("inquirer");
const conTable = require("console.table")

const db = mysql.createConnection (
  {
    host: 'localhost',
    user: 'root',
    password: 'AngryCuddle5',
    database: 'employee_db'
  },
  console.log(`Connected to the employee database.`)
);

// Helps fix promise errors
const utils = require("util");
db.query = utils.promisify(db.query)

// Primary Prompt
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


function displayDepartments() {
  db.query('SELECT id, name AS "Name" FROM employee_db.department', function (err, results) {
    console.table(results);
    promptUser();
  });
}

function displayRoles() {
  db.query(`SELECT role.id,
            role.title,
            department.name AS "Department",
            role.salary FROM employee_db.role
        JOIN department ON role.department_id = department.id;
    `, function (err, results) {
    console.table(results);
    promptUser();
  });
}

function displayEmployees() {
  db.query(`
  SELECT a.id,
    a.first_name AS "First Name",
    a.last_name AS "Last Name",
    role.title AS "Title",
    department.name AS "Department",
    role.salary AS "Salary",
    CONCAT(b.first_name, " ", b.last_name) AS "Manager"
    FROM employee AS a
    JOIN role ON a.role_id = role.id
    JOIN department ON role.department_id = department.id
    LEFT OUTER JOIN employee AS b ON a.manager_id = b.id;
  `, function (err, results) {
    console.table(results);
    promptUser();
  });
}

async function addDepartment() {
  const res = await inquirer.prompt([
    {
      type: "input",
      name: "deptAdd",
      message: "What department do you want to add?",
    }]);
  const newDeptTable = await db.query(`INSERT INTO department(name) VALUES ("${res.deptAdd}")`);
  console.log("New department added!");
  promptUser();
};

async function addRole() {
  const res = await inquirer.prompt([
    {
      type: "input",
      name: "roleAdd",
      message: "What role do you want to add?",
    },
    {
      type: "input",
      name: "roleSalary",
      message: "What is the salary for this role?",
    },
    {
      type: "input",
      name: "roleDept",
      message: "What department does this role belong to?", // COME BACK HERE TO FIX
    }
  ]);
  const newRoleTable = await db.query(`INSERT INTO role(title) VALUES ("${res.roleAdd}")`);
  console.log("New role added!");
  promptUser();
};

// Function to display hello on initialize.
 const init = () => {
    console.log("///////////////////////////////////"),
    console.log("/                                 /"),
    console.log("/           WELCOME TO            /"),
    console.log("/        EMPLOYEE TRACKER         /"),
    console.log("/                                 /"),
    console.log("///////////////////////////////////"),
    promptUser()
    };

// Function to display goodbye on quit.
const goodBye = () => {
  console.log("///////////////////////////////////"),
  console.log("/                                 /"),
  console.log("/            GOODBYE!             /"),
  console.log("/                                 /"),
  console.log("///////////////////////////////////")
};

// Initialize function call
init();