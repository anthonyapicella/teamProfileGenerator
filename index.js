const inquirer = require('inquirer');
const fs = require('fs');

const Employee = require('./lib/Employee');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');

const employees = [];

// function renderTeam() {
// 	let html = '';

// 	employees.forEach(function (res) {
// 		html += `<div class="card-body">
//         <h3 class="card-title">${res.name}</h3>
//         <h5 class="card-subtitle">Manager</h5>
//         <ul class="list-group list-group-flush">
//           <li class="list-group-item">
//             Employee ID: ${res.id}
//           </li>
//           <li class="list-group-item">
//             Email: <a href="mailto:${res.email}">${res.email}</a></li>
//           </li>
//           <li class="list-group-item">
//           <a href="https://github.com/{{ github }}" target="_blank">${res.gitHub}</a></li>
//           </li>
//           <li class="list-group-item">
//             ${res.school}
//           </li>
//         </ul>
//       </div>`;
// 	});
// }
// create variables for employee info to be rendered to page

const generateHTML = (res) =>
	`<!DOCTYPE html>
    <html lang="en">
    
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl"
        crossorigin="anonymous" />
      <link rel="stylesheet" href="./style.css" />
      <title>Team</title>
    </head>
    
    <body>
      <div class="container">
        <div class="jumbotron text-center">
          <div class="container">
            <h1 class="display-4">Our Team</h1>
            <h2 class="lead">Role call!</h2>
          </div>
        </div>
      </div>
    
      <div class="container">
        <div class="row row-cols-1 row-cols-md-2 g-4">
          <div class="col">
            <div class="card" style="width: 18rem">
              <div class="card-body">
                <h3 class="card-title">${res.name}</h3>
                <h5 class="card-subtitle">Manager</h5>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">
                    Employee ID: ${res.id}
                  </li>
                  <li class="list-group-item">
                    Email: ${res.email}
                  </li>
                  <li class="list-group-item">
                    Office Number: ${res.officeNumber}
                  </li>
                </ul>
              </div>
            </div>


          </div>
        </div>
      </div>
    
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-b5kHyXgcpbZJO/tY9Ul7kGkf1S0CWuKcCD38l8YkeH8z8QjE0GmW1gYU5S9FOnJ0"
        crossorigin="anonymous"></script>
    </body>
    
    </html>`;

// prompts user to start putting team together or exit app

function startApp() {
	inquirer
		.prompt([
			{
				name: 'startApp',
				type: 'confirm',
				message: 'Would you like to assemble a team?',
			},
		])
		.then((res, err) => {
			if (err) console.error(err);
			if (res.startApp) {
				addManager();
			} else {
				process.exit();
			}
		});
}

// first add info for manager

function addManager() {
	inquirer
		.prompt([
			{
				name: 'name',
				type: 'input',
				message: "Start by entering Manager's name:",
				validate: (input) => {
					if (input) {
						return true;
					} else {
						console.log('--- NOT A VALID INPUT... TRY AGAIN ---');
						return false;
					}
				},
			},
			{
				name: 'id',
				type: 'input',
				message: "Enter Manager's Employee ID number:",
				validate: (input) => {
					if (input) {
						return true;
					} else {
						console.log('--- NOT A VALID INPUT... TRY AGAIN ---');
						return false;
					}
				},
			},
			{
				name: 'email',
				type: 'input',
				message: "Enter Manager's email address:",
				validate: (input) => {
					if (input) {
						return true;
					} else {
						console.log('--- NOT A VALID INPUT... TRY AGAIN ---');
						return false;
					}
				},
			},
			{
				name: 'officeNumber',
				type: 'input',
				message: "Enter Manager's office number:",
				validate: (input) => {
					if (input) {
						return true;
					} else {
						console.log('--- NOT A VALID INPUT... TRY AGAIN ---');
						return false;
					}
				},
			},
			{
				name: 'nextEmp',
				type: 'confirm',
				message: 'Would you like to add another employee?',
			},
		])
		.then((res, err) => {
			if (err) console.error(err);
			const newManager = new Manager(
				res.name,
				res.id,
				res.email,
				res.officeNumber
			);
			employees.push(newManager);

			if (res.nextEmp) {
				newMember();
			} else {
				const htmlPageContent = generateHTML(res);

				fs.writeFile('dist/index.html', htmlPageContent, (err) =>
					err
						? console.log(err)
						: console.log('Successfully created index.html!')
				);
			}
		});
}

function newMember() {
	inquirer
		.prompt([
			{
				name: 'empType',
				type: 'list',
				message: 'Please select member role:',
				choices: ['Engineer', 'Intern', '-- Finish Team --'],
			},
		])
		.then((res, err) => {
			if (err) console.error(err);
			console.log(res.empType);
			switch (res.empType) {
				case 'Engineer':
					addEngineer();
					break;
				case 'Intern':
					addIntern();
					break;
				case '-- Finish Team --':
					const htmlPageContent = generateHTML(res);

					fs.writeFile('dist/index.html', htmlPageContent, (err) =>
						err
							? console.log(err)
							: console.log('Successfully created index.html!')
					);
			}
		});
}

function addEngineer() {
	inquirer
		.prompt([
			{
				name: 'name',
				type: 'input',
				message: "What is your Engineer's name?",
				validate: (input) => {
					if (input) {
						return true;
					} else {
						console.log('--- NOT A VALID INPUT... TRY AGAIN ---');
						return false;
					}
				},
			},
			{
				name: 'id',
				type: 'input',
				message: "Enter Engineer's Employee ID number:",
				validate: (input) => {
					if (input) {
						return true;
					} else {
						console.log('--- NOT A VALID INPUT... TRY AGAIN ---');
						return false;
					}
				},
			},
			{
				name: 'email',
				type: 'input',
				message: "Enter Engineer's email address:",
				validate: (input) => {
					if (input) {
						return true;
					} else {
						console.log('--- NOT A VALID INPUT... TRY AGAIN ---');
						return false;
					}
				},
			},
			{
				name: 'gitHub',
				type: 'input',
				message: "Enter Engineer's GitHub username:",
				validate: (input) => {
					if (input) {
						return true;
					} else {
						console.log('--- NOT A VALID INPUT... TRY AGAIN ---');
						return false;
					}
				},
			},
			{
				name: 'nextEmp',
				type: 'confirm',
				message: 'Would you like to add another employee?',
			},
		])
		.then((res, err) => {
			if (err) console.error(err);
			const newEngineer = new Engineer(
				res.name,
				res.id,
				res.email,
				res.gitHub,
				res.role = 'Engineer',
			);
			employees.push(newEngineer);
			console.log(employees);

			if (res.nextEmp) {
				newMember();
			} else {
				const htmlPageContent = generateHTML(res);

				fs.writeFile('dist/index.html', htmlPageContent, (err) =>
					err
						? console.log(err)
						: console.log('Successfully created index.html!')
				);
                renderTeam();
			}
		});
}

function addIntern() {
	inquirer
		.prompt([
			{
				name: 'name',
				type: 'input',
				message: "What is your Intern's name?",
				validate: (input) => {
					if (input) {
						return true;
					} else {
						console.log('--- NOT A VALID INPUT... TRY AGAIN ---');
						return false;
					}
				},
			},
			{
				name: 'id',
				type: 'input',
				message: "Enter Intern's Employee ID number:",
				validate: (input) => {
					if (input) {
						return true;
					} else {
						console.log('--- NOT A VALID INPUT... TRY AGAIN ---');
						return false;
					}
				},
			},
			{
				name: 'email',
				type: 'input',
				message: "Enter Intern's email address:",
				validate: (input) => {
					if (input) {
						return true;
					} else {
						console.log('--- NOT A VALID INPUT... TRY AGAIN ---');
						return false;
					}
				},
			},
			{
				name: 'school',
				type: 'input',
				message: "Enter Intern's School:",
				validate: (input) => {
					if (input) {
						return true;
					} else {
						console.log('--- NOT A VALID INPUT... TRY AGAIN ---');
						return false;
					}
				},
			},
			{
				name: 'nextEmp',
				type: 'confirm',
				message: 'Would you like to add another employee?',
			},
		])
		.then((res, err) => {
			if (err) console.error(err);
			const newIntern = new Intern(
				res.name,
				res.id,
				res.email,
				res.school,
				res.role = 'Intern',
			);
			employees.push(newIntern);
			console.log(employees);
			if (res.nextEmp) {
				newMember();
			} else {
				const htmlPageContent = generateHTML(res);

				fs.writeFile('dist/index.html', htmlPageContent, (err) =>
					err
						? console.log(err)
						: console.log('Successfully created index.html!')
				);
                renderTeam();
			}
		});
}

startApp();
