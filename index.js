const fs = require('fs');
const inquirer = require('inquirer');
const path = require('path');
const Manager = require('./lib/Manager');
const Intern = require('./lib/Intern');
const Engineer = require('./lib/Engineer');

const DIST_DIR = path.resolve(__dirname, "dist");
const distPath = path.join(DIST_DIR, "team.html");

const render = require('./src/page-template.js');

const teamMembers = [];
const idArray = [];

console.log('\nWelcome to the Team Dashboard Generator!\n');

function generationProcess() {
    // function objective: there is only one manager, so condense 
    function createManager() {
        console.log("Time to build your team dashboard!");
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
        .then((answers) => {
            // make new manager variable from the input results
            const manager = new Manager(
                answers.managerName,
                answers.managerID,
                answers.managerEmail,
                answers.managerOfficeNumber
            );
            // push new contents into preset array
            teamMembers.push(manager);
            // push ID into array
            idArray.push(answers.managerID);
            // move onto next function
            createTeamOptions();
        });
    }

// function objective: userchoice allows for selection & will lead straight into the function of their desired selection
    function createTeamOptions() {
        inquirer.prompt([
            {
                type: "list",
                name: "memberChoice",
                message: "What kind of member do you want to add to your team?",
                choices: [
                    "Engineer",
                    "Intern",
                    "None",
                ],
            },
        ])
        .then((userChoice) => {
            switch (userChoice.memberChoice) {
                case "Engineer":
                    addEngineer();
                    break;
                case "Intern":
                    addIntern();
                    break;
                default: finishBuild();
            }
        });
    }



    function addEngineer() {
        inquirer.prompt([
            {
                type: "input",
                name: "engineerName",
                message: "What is your engineer's name?",
                validate: (answer) => {
                    if (answer !== '') {
                        return true;
                    } else {
                        return "Please enter at least one character";
                    };
                },
            },
            {
                type: "input",
                name: "engineerID",
                message: "What is your engineer's ID?",
                validate: (answer) => {
                    const pass = answer.match(/^[1-9]\d*$/);
                    if (pass) {
                        return true;
                    } else {
                        return "Please enter a postive number that is greater than 0";
                    };
                },
            },
            {
                type: "input",
                name: "engineerEmail",
                message: "What is your engineer's email address?",
                validate: (answer) => {
                    const pass = answer.match(/\S+@\S+\.\S+/);
                    if (pass) {
                        return true;
                    } else {
                        return "Please enter a valid email address.";
                    };
                },
            },
            {
                type: "input",
                name: "engineerGithub",
                message: "What is your engineer's GitHub username?",
                validate: (answer) => {
                    if (answer !== '') {
                        return true;
                    } else {
                        return "Please enter at least one character";
                    };
                },
            },
        ])
        .then((answers) => {
            const engineer = new Engineer(
                answers.engineerName,
                answers.engineerID,
                answers.engineerEmail,
                answers.engineerGithub
            );
            teamMembers.push(engineer);
            idArray.push(answers.engineerID);
            // route back to team options and once they're finished adding they select 'none' to finish the process.
            createTeamOptions();
        });
    }


    function addIntern() {
        inquirer.prompt([
            {
                type: "input",
                name: "internName",
                message: "What is your intern's name",
                validate: (answer) => {
                    if (answer !== '') {
                        return true;
                    } else {
                        return "Please enter at least one character";
                    };
                },
            },
            {
                type: "input",
                name: "internID",
                message: "What is your intern's ID",
                validate: (answer) => {
                    const pass = answer.match(/^[1-9]\d*$/);
                    if (pass) {
                        return true;
                    } else {
                        return "Please enter a postive number that is greater than 0";
                    };
                },
            },
            {
                type: "input",
                name: "internEmail",
                message: "What is your intern's email address?",
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
                name: "internSchool",
                message: "What is your intern's university name?",
                validate: (answer) => {
                    if (answer !== '') {
                        return true;
                    } else {
                        return "Please enter at least one character";
                    };
                },
            },
        ])
        .then((answers) => {
            const intern = new Intern(
                answers.internName,
                answers.internID,
                answers.internEmail,
                answers.internSchool
            );
            teamMembers.push(intern);
            idArray.push(answers.internID);
            createTeamOptions();
        });
    };


    function finishBuild() {
        if (!fs.existsSync(DIST_DIR)) {
            fs.mkdirSync(DIST_DIR);
        }
        fs.writeFileSync(distPath, render(teamMembers), 'utf-8');
    }

    createManager();
}

generationProcess();