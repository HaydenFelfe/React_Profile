const inquirer = require('inquirer');
const { createConnection } = require('./db');

function displayMenu() {
  inquirer
    .prompt({
      name: 'action',
      type: 'list',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Exit'
      ]
    })
    .then((answer) => {
      switch (answer.action) {
        case 'View all departments':
          viewAllDepartments();
          break;
        case 'View all roles':
          viewAllRoles();
          break;
        case 'View all employees':
          viewAllEmployees();
          break;
        case 'Add a department':
          addDepartment();
          break;
        case 'Add a role':
          addRole();
          break;
        case 'Add an employee':
          addEmployee();
          break;
        case 'Update an employee role':
          updateEmployeeRole();
          break;
        case 'Exit':
          console.log('Exiting Employee Tracker...');
          process.exit();
      }
    });
}

function viewAllDepartments() {
  const connection = createConnection();

  connection.query('SELECT * FROM department', (err, departments) => {
    if (err) throw err;

    console.table(departments);

    connection.end();
    displayMenu();
  });
}

function viewAllRoles() {
  const connection = createConnection();

  connection.query(
    'SELECT role.id, role.title, role.salary, department.name AS department FROM role LEFT JOIN department ON role.department_id = department.id',
    (err, roles) => {
      if (err) throw err;

      console.table(roles);

      connection.end();
      displayMenu();
    }
  );
}

function viewAllEmployees() {
  const connection = createConnection();

  connection.query(
    `SELECT 
      employee.id, 
      employee.first_name, 
      employee.last_name, 
      role.title, 
      department.name AS department, 
      role.salary, 
      CONCAT(manager.first_name, ' ', manager.last_name) AS manager 
    FROM 
      employee 
      LEFT JOIN role ON employee.role_id = role.id 
      LEFT JOIN department ON role.department_id = department.id 
      LEFT JOIN employee manager ON employee.manager_id = manager.id`,
    (err, employees) => {
      if (err) throw err;

      console.table(employees);

      connection.end();
      displayMenu();
    }
  );
}

function addDepartment() {
  const connection = createConnection();

  inquirer
    .prompt([
      {
        name: 'name',
        type: 'input',
        message: 'Enter the name of the department:',
        validate: (input) => {
          if (input.trim() !== '') {
            return true;
          } else {
            return 'Please enter a valid department name.';
          }
        }
      }
    ])
    .then((answer) => {
        connection.query(
          'INSERT INTO department (name) VALUES (?)',
          [answer.name],
          (err, res) => {
            if (err) throw err;
  
            console.log('Department added successfully!');
  
            connection.end();
  
            displayMenu();
          }
        );
      });
  }
  
  function addRole() {
    const connection = createConnection();
  
    connection.query('SELECT * FROM department', (err, departments) => {
      if (err) throw err;
  
      inquirer
        .prompt([
          {
            name: 'title',
            type: 'input',
            message: 'Enter the title of the role:'
          },
          {
            name: 'salary',
            type: 'input',
            message: 'Enter the salary for the role:'
          },
          {
            name: 'department',
            type: 'list',
            message: 'Select the department for the role:',
            choices: departments.map((department) => department.name)
          }
        ])
        .then((answer) => {
          const departmentId = departments.find(
            (department) => department.name === answer.department
          ).id;
  
          connection.query(
            'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)',
            [answer.title, answer.salary, departmentId],
            (err, res) => {
              if (err) throw err;
  
              console.log('Role added successfully!');
  
              connection.end();
  
              displayMenu();
            }
          );
        });
    });
  }
  
  function addEmployee() {
    const connection = createConnection();
  
    connection.query('SELECT * FROM role', (err, roles) => {
      if (err) throw err;
  
      connection.query('SELECT * FROM employee', (err, employees) => {
        if (err) throw err;
  
        inquirer
          .prompt([
            {
              name: 'first_name',
              type: 'input',
              message: "Enter the employee's first name:"
            },
            {
              name: 'last_name',
              type: 'input',
              message: "Enter the employee's last name:"
            },
            {
              name: 'role',
              type: 'list',
              message: "Select the employee's role:",
              choices: roles.map((role) => role.title)
            },
            {
              name: 'manager',
              type: 'list',
              message: "Select the employee's manager:",
              choices: ['None'].concat(
                employees.map(
                  (employee) =>
                    `${employee.first_name} ${employee.last_name}`
                )
              )
            }
          ])
          .then((answer) => {
            const roleId = roles.find((role) => role.title === answer.role).id;
            let managerId = null;
  
            if (answer.manager !== 'None') {
              const manager = employees.find(
                (employee) =>
                  `${employee.first_name} ${employee.last_name}` ===
                  answer.manager
              );
              managerId = manager.id;
            }
  
            connection.query(
              'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
              [answer.first_name, answer.last_name, roleId, managerId],
              (err, res) => {
                if (err) throw err;
  
                console.log('Employee added successfully!');
  
                connection.end();
  
                displayMenu();
              }
            );
          });
      });
    });
  }
  
  function updateEmployeeRole() {
    const connection = createConnection();
  
    connection.query('SELECT * FROM employee', (err, employees) => {
      if (err) throw err;
      connection.query('SELECT * FROM role', (err, roles) => {
        if (err) throw err;
  
        inquirer
          .prompt([
            {
              name: 'employee',
              type: 'list',
              message: 'Select the employee to update:',
              choices: employees.map(
                (employee) => `${employee.first_name} ${employee.last_name}`
              )
            },
            {
              name: 'role',
              type: 'list',
              message: 'Select the new role for the employee:',
              choices: roles.map((role) => role.title)
            }
          ])
          .then((answer) => {
            const employeeId = employees.find(
              (employee) =>
                `${employee.first_name} ${employee.last_name}` === answer.employee
            ).id;
  
            const roleId = roles.find((role) => role.title === answer.role).id;
  
            connection.query(
              'UPDATE employee SET role_id = ? WHERE id = ?',
              [roleId, employeeId],
              (err, res) => {
                if (err) throw err;
  
                console.log('Employee role updated successfully!');
  
                connection.end();
  
                displayMenu();
              }
            );
          });
      });
    });
  }
  
  // Call the displayMenu function to start the application
  displayMenu();
  
     
  