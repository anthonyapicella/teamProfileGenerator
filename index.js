const inquirer = require('inquirer');
const fs = require('fs');

// require classes
const Employee = require('./lib/Employee');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');

// declare empty array for employee objects
const employees = [];

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
// add validation (for every prompt)
function addManager() {
	inquirer
		.prompt([
			{
				name: 'name',
				type: 'input',
				message: "Please enter Manager's name:",
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
				message: "Enter Manager's ID number:",
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
		// capture responses and create new manager
		.then((res, err) => {
			if (err) console.error(err);
			const newManager = new Manager(
				res.name,
				res.id,
				res.email,
				res.officeNumber
			);
			// push new manager to employees array
			employees.push(newManager);

			if (res.nextEmp) {
				newMember();
			} else {
				console.log(employees);
				renderTeam();
			}
		});
}

// if user chooses to add new member, prompt will provide choices for Engineer, Intern or "finish"
// If user opts to finish -> render existing team
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
			switch (res.empType) {
				case 'Engineer':
					addEngineer();
					break;
				case 'Intern':
					addIntern();
					break;
				case '-- Finish Team --':
					renderTeam();
			}
		});
}

// the following will collect data for Engineer
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
				res.gitHub
			);
			employees.push(newEngineer);
			if (res.nextEmp) {
				newMember();
			} else {
				renderTeam();
			}
		});
}

// the following will collect data for Intern
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
				res.school
			);
			employees.push(newIntern);
			console.log(employees);
			if (res.nextEmp) {
				newMember();
			} else {
				renderTeam();
			}
		});
}

// create function to render team to HTML page using cards and template literals
// will loop through array of objects to render each employee to their own card
function renderTeam() {
	const htmlPageContent = [];
	const htmlPageHead = `
	<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<link
			href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css"
			rel="stylesheet"
			integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl"
			crossorigin="anonymous"
		/>
		<link rel="stylesheet" href="./style.css" />
		<title>Team</title>
	</head>

	<body>
		<div class="container">
			<div class="jumbotron text-center">
				<div class="container">
					<h1 class="display-2">Our Team</h1>
					<h2>"Role call!"</h2>
				</div>
			</div>
		</div>
    
		<div class="container">
			<div class="row p-4 justify-content-center">
				<div class="row p-3 d-flex justify-content-between">`

	htmlPageContent.push(htmlPageHead);

	for (let i = 0; i < employees.length; i++) {
		let card = `
					<div class="card" style="width: 19rem">
						<div class="card-body">
							<h3 class="card-title">${employees[i].name}</h3>
							<h5 class="card-subtitle">${employees[i].role}</h5>
							<ul class="list-group list-group-flush">
								<li class="list-group-item">
									<strong>ID:</strong> ${employees[i].id}
								</li>
								<li class="list-group-item">
									<strong>Email:</strong>
								<a href="mailto:${employees[i].email}"
									>${employees[i].email}</a
									>
								</li>`;
			if (employees[i].officeNumber) {
				card += `
								<li class="list-group-item">
									<strong>Office Number: </strong>${employees[i].officeNumber}
								</li>`;
			}if (employees[i].gitHub) {
				card += `
								<li class="list-group-item">
									<strong>GitHub:</strong> <a href="https://github.com/${employees[i].gitHub}">${employees[i].gitHub}</a>
								</li>`;
			}if (employees[i].school) {
			card += `
								<li class="list-group-item">
									<strong>School:</strong> ${employees[i].school}
								</li>`;
			}
			card += `
							</ul>			
						</div>
					</div>`;

		htmlPageContent.push(card);
	}

	
	const htmlFoot = `
				</div >
			</div >
  		</div >
	  
		<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/js/	bootstrap.bundle.min.js"
        integrity="sha384-b5kHyXgcpbZJO/tY9Ul7kGkf1S0CWuKcCD38l8YkeH8z8QjE0GmW1gYU5S9FOnJ0"
        crossorigin="anonymous"></script>
    </body>
    
</html>`;
	htmlPageContent.push(htmlFoot);

	fs.writeFile('dist/index.html', htmlPageContent.join(''), (err) =>
		err ? console.log(err) : console.log('Successfully created index.html!')
	);
}

// start application
startApp();
