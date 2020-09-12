const fs = require('fs');
const inquire = require('inquirer');
const cheerio = require('cheerio');
const open = require('open');
const employee = require('./assets/employee');
const manager = require('./assets/manager');
const engineer = require('./assets/engineer');
const intern = require('./assets/intern');


let employeeID = 0;
let employees = [];

const firstQuestion = [
    {
        name: 'addingEmployee',
        message: 'Would you like to add an employee?',
        type: 'confirm',
        default: true
    }
]

const userPrompt = [
    {
        name: 'employeeRole',
        message: 'What is your position?',
        type: 'list',
        choices: ["Employee", "Engineer", "Manager", "Intern"]
    },
    {
        name: 'employeeName',
        message: 'What is your name?',
        type: 'input',
    },
    {
        name: 'employeeEmail',
        message: 'What is your email?',
        type: 'input',
        validate: function (employeeEmail) {
            valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(empEmail)

            if (valid) {
                return true;
            } else {
                console.log("Email is invalid, please input new email")
                return false;
            }
        }

    },
    {
        name: 'employeeSchool',
        message: 'What school do you attend?',
        type: 'input',
        when: function (answers) {
            return answers.employeeRole === 'Intern'
        }
    },
    {
        name: 'employeeOffice',
        message: 'What office are you in?',
        type: 'input',
        when: function (answers) {
            return answers.employeeRole === 'Manager'
        }
    },
    {
        name: 'employeeGithub',
        message: 'What is your GitHub username?',
        type: 'input',
        when: function (answers) {
            return answers.employeeRole === 'Engineer'
        }
    },
]

function gatherEmployeeInfo(retFunction) {

    inquire
        .prompt(userPrompt)
        .then(function (response) {

            employeeID += 1;

            let user;

            if (response.employeeRole === 'Manager') {
                user = new manager(response.employeeName, employeeID, response.employeeEmail, response.employeeOffice);
            } else if (response.employeeRole === 'Engineer') {
                user = new engineer(response.employeeName, employeeID, response.employeeEmail, response.employeeGithub);
            } else if (response.employeeRole === 'Intern') {
                user = new intern(response.employeeName, employeeID, response.employeeEmail, response.employeeSchool);
            } else if (response.employeeRole === 'Employee') {
                user = new employee(response.employeeName, employeeID, response.employeeEmail);
            }

            employees.push(user);

            retFunction();
        });

}



