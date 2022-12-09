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