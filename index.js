const inquirer = require('inquirer');
const fs = require('fs');

const Employee = require('./lib/Employee');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');

const employees = [];

function buildTeam() {
	newMember();
	//memberPage();
}

function newMember() {
	inquirer
		.prompt([
			{
				name: 'empType',
				type: 'list',
				message: 'Please select member role:',
				choices: ['Manager', 'Engineer', 'Intern'],
			},
		])
		.then((res, err) => {
			if (err) console.error(err);
			console.log(res.empType);
			switch (res.empType) {
				case 'Manager':
					addManager();
					break;
				case 'Engineer':

				case 'Intern':
			}
		});
}

function addManager() {
	inquirer.prompt([
		{
			name: 'name',
			type: 'input',
			message: 'What is your managers name?',
		},
		{
			name: 'id',
			type: 'input',
			message: "Enter Manager's Employee ID number",
		},
		{
			name: 'email',
			type: 'input',
			message: "Enter Manager's email address",
		},
		{
			name: 'officeNumber',
			type: 'input',
			message: "Enter Manager's office number",
		},
        {
			name: 'nextEmp',
			type: 'confirm',
			message: "Would you like to enter another employee?",
		},

	])
    .then((res, err) => {
        if (err) console.error(err);
        console.log(res.empType);
        switch (res.nextEmp) {
            case true:
                newMember();
                break;
        }
    });
}

buildTeam();
