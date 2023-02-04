const express = require('express');
const mysql = require('mysql2');
const inquirer = require("inquirer");
const conTable = require("console.table")
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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
    console.log("This is where the prompt would happen.")

}






app.use((req, res) => {
    res.status(404).end();
  });
  
  app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`)
    await (
        console.log("///////////////////////////////////"),
        console.log("/                                 /"),
        console.log("/           WELCOME TO            /"),
        console.log("/        EMPLOYEE TRACKER         /"),
        console.log("/                                 /"),
        console.log("///////////////////////////////////"),
        promptUser()
    )
  });