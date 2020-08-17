const fs = require("fs");
const inquirer = require('inquirer');
const newLine = "\n";

var questions =  [{
    type: 'input',
    name: 'title',
    message: 'What is your project name?',
    default: '',
  },
{
  type: 'input',
  name: 'description',
  message: 'What is your project description?',
  default: '',
},
// {
//     type: 'input',
//     name: 'Title',
//     message: 'What is your project name?',
//     default: '',
//   },
];

function generateMD(answers) {
    var markDown = "";
    markDown += getHeading1(answers.title);
    markDown += generateParagraph(answers.description);

    return markDown;
};

function getHeading1(text) {
    return "# " + text + newLine;
};

function generateParagraph(text) {
    return newLine + text + newLine;
}




inquirer.prompt(questions).then((answers) => {
    fs.writeFile("README.md", generateMD(answers), function(){

    });
  });
  
console.log("hello world")
// * Title
// * Description
// * Table of Contents
// * Installation
// * Usage
// * License
// * Contributing
// * Tests
// * Questions