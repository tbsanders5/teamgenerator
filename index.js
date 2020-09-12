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
            valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(employeeEmail)

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

function createEmployee() {
    inquire
        .prompt(firstQuestion)
        .then(function (response) {
            if (response.addingEmployee)
                gatherEmployeeInfo(createEmployee);
                else
                generateHtml();
        });
}

function generateHtml() {
    let infoHTML = fs.readFileSync('./index.html', 'utf8', function(err) {
        if (err)
            console.log(err);

    });

    const $ = cheerio.load(infoHTML);

    employees.forEach(user => {
        let employeeRole = user.getRole();
        let output;

        if (employeeRole === 'Manager') {
            output = generateManager(user.name, user.id, user.email, user.officeNum);
        } else if (employeeRole === 'Employee') {
            output = generateEmployee(user.name, user.id, user.email);
        } else if (employeeRole === 'Engineer') {
            output = generateEngineer(user.name, user.id, user.email, user.github);
        } else if (employeeRole === 'Intern') {
            output = generateIntern(user.name, user.id, user.email, user.school)
        }

        $('#teamGenerator').append(output);
    });

    fs.writeFile('./teamOutput.html', $.html(), function(err) {
        if (err)
            console.log(err);

            openTeamBreakdown('./teamOutput.html')
    });
}

async function openTeamBreakdown (fileName) {

    await open(fileName, {wait:true});
    console.log('File is opening');
}

function generateManager(name, id, email, officeNum) {
    return `<div class="card m-2" style="width: 18rem;">
    <div class="card-body bg-primary text-white">
      <h5 class="card-title">${name}</h5>
      <h5 class="card-title">Manager</h5>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">Id: ${id}</li>
      <li class="list-group-item">Email: <a href="mailto:${email}" class="card-link">${email}</a></li>
      <li class="list-group-item">School: ${officeNum}</li>
    </ul>
    </div>`
}

function generateEmployee(name, id, email) {
    return `<div class="card m-2" style="width: 18rem;">
    <div class="card-body bg-primary text-white">
      <h5 class="card-title">${name}</h5>
      <h5 class="card-title">Employee</h5>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">Id: ${id}</li>
      <li class="list-group-item">Email: <a href="mailto:${email}" class="card-link">${email}</a></li>
    </ul>
    </div>`
}

function generateIntern(name, id, email, school) {
    return `<div class="card m-2" style="width: 18rem;">
    <div class="card-body bg-primary text-white">
      <h5 class="card-title">${name}</h5>
      <h5 class="card-title">Intern</h5>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">Id: ${id}</li>
      <li class="list-group-item">Email: <a href="mailto:${email}" class="card-link">${email}</a></li>
      <li class="list-group-item">School: ${school}</li>
    </ul>
    </div>`
}

function generateEngineer(name, id, email, github) {
    return `<div class="card m-2" style="width: 18rem;">
    <div class="card-body bg-primary text-white">
      <h5 class="card-title">${name}</h5>
      <h5 class="card-title">Engineer</h5>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">Id: ${id}</li>
      <li class="list-group-item">Email: <a href="mailto:${email}" class="card-link">${email}</a></li>
      <li class="list-group-item">School: ${github}</li>
    </ul>
    </div>`
}

createEmployee();



