
// Import and require mysql2
const mysql = require('mysql2');
const inquirer = require("inquirer");
const art = require('ascii-art');
// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // MySQL password
    password: "r00t",
    database: "employeetracker_db",
  },
  console.log(`Connected to the employeetracker_db database.`)
);
db.connect((err) => {
  if (err) throw err;
  // console.log(art.font("Some Text", 'doom', true));
  art.font("Employee Tracker", 'doom')
       .then((rendered)=>{
           //rendered is the ascii
         console.log(rendered);
         mainMenu();
       })
});

const questions = [
  {
    name: "choices",
    type: "list",
    message: "What would you like to do?",
    choices: ["View Employees", "View Roles", "View Departments", "Add an Employee", "Add a Role", "Add a Department", "Update Employee Role"]
  }
];
const employeeQuestions = [
  {
    name: "first_name",
    type: "input",
    message: "What is the employee's first name?",
  },
  {
    name: "last_name",
    type: "input",
    message: "What is the employee's last name?",
  },
  {
    name: "role_id",
    type: "input",
    message: "What is the employee's role id?",
  },
  {
    name: "manager_id",
    type: "input",
    message: "What is the id of the employee's manager?",
  },
];
const roleQuestions = [
  {
    name: "job_title",
    type: "input",
    message: "What is the job title for this role?",
  },
  {
    name: "salary",
    type: "input",
    message: "What is the salary of this role?",
  },
  {
    name: "department_id",
    type: "input",
    message: "What is the id of this role's department?",
  },
];
const departmentQuestions = [
  {
    name: "id",
    type: "input",
    message: "What is the id number of this department?",
  },
  {
    name: "department_name",
    type: "input",
    message: "What is the name of this department?",
  },
];
const updateEmployeeRole = [
  {
    name: "id",
    type: "input",
    message: "What is the employee's id number?",
  },
  {
    name: "role_id",
    type: "input",
    message: "What is the id number of the employee's new role?",
  },
];

// Query database
function mainMenu() {
  inquirer.prompt(questions).then(({ choices }) => {
    if (choices === "View Employees") {
      viewEmployees();
    }
    if (choices === "View Roles") {
      viewRoles();
    }
    if (choices === "View Departments") {
      viewDepartments();
    }
    if (choices === "Add an Employee") {
      addEmployee();
    }
    if (choices === "Add a Role") {
      addRole();
    }
    if (choices === "Add a Department") {
      addDepartment();
    }
    if (choices === "Update Employee Role") {
      updateEmployee();
    }
  });
}
  
async function viewEmployees() {
db.query("SELECT * FROM employee", function (err, results) {
  console.table(results);
  mainMenu();
});
}
async function viewRoles() {
db.query("SELECT * FROM role", function (err, results) {
  console.table(results);
  mainMenu();
});
}
async function viewDepartments() {
db.query("SELECT * FROM department", function (err, results) {
  console.table(results);
  mainMenu();
});
}

async function addEmployee() {
const { first_name, last_name, role_id, manager_id } = await inquirer.prompt(
  employeeQuestions
);
db.query(
  "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
  [first_name, last_name, role_id, manager_id],
  function (err, results) {
    console.table(results);
    viewEmployees();
  }
); 
}
async function addRole() {
const { job_title, department_id, salary } = await inquirer.prompt(
  roleQuestions
);
db.query(
  "INSERT INTO role (job_title, department_id, salary) VALUES (?, ?, ?)",
  [job_title, department_id, salary],
  function (err, results) {
    console.table(results);
    viewRoles();
  }
); 
}
async function addDepartment() {
const { id, department_name } = await inquirer.prompt(departmentQuestions);
db.query(
  "INSERT INTO department (id, department_name) VALUES (?, ?)",
  [id, department_name],
  function (err, results) {
    console.table(results);
    viewDepartments();
  }
); 
}
async function updateEmployee() {
  
  const { id, role_id } = await inquirer.prompt(
    updateEmployeeRole)
  db.query("UPDATE employee SET role_id = ? WHERE id = ?", [role_id, id],
    function (err, results) {
      console.table(results);
      viewEmployees();
  });
}

