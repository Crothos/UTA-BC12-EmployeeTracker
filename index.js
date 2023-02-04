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
  await db.query(`INSERT INTO department(name) VALUES ("${res.deptAdd}")`);
  console.log(`\nNew department added!\n`);
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
      type: 'list',
      name: 'roleDept',
      message: 'What department does this role belong to?',
      choices: [
        'Sales',
        'Engineering',
        'Finance',
        'Legal'
      ] // THIS IS PLACEHOLDER AND SHOULD POPULATE FROM THE DB
    }
  ]);
  
  if (res.RoleDept === "Sales") {
    await db.query(`INSERT INTO role(title, salary, department_id) VALUES ("${res.roleAdd}", "${res.roleSalary}", ${1})`)};
  if (res.RoleDept === "Engineering") {
    await db.query(`INSERT INTO role(title, salary, department_id) VALUES ("${res.roleAdd}", "${res.roleSalary}", ${2})`)};
  if (res.RoleDept === "Finance") {
    await db.query(`INSERT INTO role(title, salary, department_id) VALUES ("${res.roleAdd}", "${res.roleSalary}", ${3})`)};
  if (res.RoleDept === "Legal") {
    await db.query(`INSERT INTO role(title, salary, department_id) VALUES ("${res.roleAdd}", "${res.roleSalary}", ${4})`)};

  console.log(`\n New role added!\n`);
  promptUser();
};

async function addEmployee() {
  const res = await inquirer.prompt([
    {
      type: "input",
      name: "firstAdd",
      message: "What is the first name of your new employee?",
    },
    {
      type: "input",
      name: "lastAdd",
      message: "What is the last name of your new employee?",
    },
    {
      type: "list",
      name: "empRole",
      message: "What role applies to this employee?", // NEEDS HELP
      choices: [
        'Sales Lead',
        'Salesperson',
        'Lead Engineer',
        'Software Engineer',
        'Account Manager',
        'Accountant',
        'Legal Team Lead',
        'Lawyer'
      ] // PLACEHOLDER; SHOULD POPULATE FROM DB
    },
    {
      type: "list",
      name: "empMan",
      message: "What manager does this employee report to?", // NEEDS HELP
      choices: [
        'John Sierra',
        'Ashley Martinez',
        'Kunal Chara',
        'Sarah Totten'
      ]
    }
  ]);
  if (res.empRole === "Sales Lead") {
    await db.query(`INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("${res.firstAdd}", "${res.lastAdd}", ${1}, ${null})`)};
  if (res.empRole === "Salesperson") {
    await db.query(`INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("${res.firstAdd}", "${res.lastAdd}", ${2}, ${1})`)};
  if (res.empRole === "Lead Engineer") {
    await db.query(`INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("${res.firstAdd}", "${res.lastAdd}", ${3}, ${null})`)};
  if (res.empRole === "Software Engineer") {
    await db.query(`INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("${res.firstAdd}", "${res.lastAdd}", ${4}, ${3})`)};
  if (res.empRole === "Account Manager") {
    await db.query(`INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("${res.firstAdd}", "${res.lastAdd}", ${5}, ${null})`)};
  if (res.empRole === "Accountant") {
    await db.query(`INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("${res.firstAdd}", "${res.lastAdd}", ${6}, ${5})`)};
  if (res.empRole === "Legal Team Lead") {
    await db.query(`INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("${res.firstAdd}", "${res.lastAdd}", ${7}, ${null})`)};
  if (res.empRole === "Lawyer") {
    await db.query(`INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("${res.firstAdd}", "${res.lastAdd}", ${8}, ${7})`)};

  console.log(`\n New employee added!\n`);
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