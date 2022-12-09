const fs = require('fs');
const inquirer = require('inquirer');
const path = require('path');
const Manager = require('./lib/Manager');
const Intern = require('./lib/Intern');
const Engineer = require('./lib/Engineer');

const DIST_DIR = path.resolve(__dirname, "dist");
const distPath = path.join(DIST_DIR, "team.html");

const render = require('./src/page-template.js');

const teamMember = [];
const idArray = [];

console.log('\nWelcome to the Team Dashboard Generator!\n');

function generationProcess() {
    function createManager() {
        inquirer.prompt([
            {
                type: "input",
                name: "managerName",
                message: "What is your manager's name?",
                validate: (answer) => {
                    if (answer !== '') {
                        return true;
                    } else {
                        return 'Please enter at least one character!';
                    };
                },
            },
            {
                type: "ID",
                name: "managerID",
                message: "What is your team manager's ID?",
                validate: (answer) => {
                    const pass = answer.match(/^[1-9]\d*$/);
                    if (pass) {
                        return true;
                    } else {
                        return "Please enter a positive number that is greater than 0";
                    };
                },
            },
            {
                type: "input",
                name: "managerEmail",
                message: "What is your manager's email?",
                validate: (answer) => {
                    const pass = answer.match(/\S+@\S+\.\S+/);
                    if (pass) {
                        return true;
                    } else {
                        return "Please enter a valid email address";
                    };
                },
            },
            {
                type: "input",
                name: "managerOfficeNumber",
                message: "What is your manager's office number?",
                validate: (answer) => {
                    const pass = answer.match(/^[1-9]\d*$/);
                    if (pass) {
                        return true;
                    } else {
                        return "Please enter a postive number that is greater than 0";
                    };
                },
            },
        ])
    }
    function createTeamOptions() {

    }
    function addEngineer() {

    }
    function addIntern() {

    }
    function finishBuild() {

    }
    createManager();


}

generationProcess();