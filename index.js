const fs = require("fs");
const inquirer = require('inquirer');
const newLine = "\n";

var questions =  [{
    type: 'input',
    name: 'title',
    message: 'What is your project name?',
    default: 'Title',
  },
{
  type: 'input',
  name: 'description',
  message: 'What is your project description?',
  default: 'Description',
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

    markDown += getHeading2("Table of Contents");

    markDown += generateListItem(generateLink("Installation", "#installation"));
    markDown += generateListItem(generateLink("Usage", "#usage"));
    markDown += generateListItem(generateLink("License", "#license"));
    markDown += generateListItem(generateLink("Contributing", "#contributing"));
    markDown += generateListItem(generateLink("Tests", "#tests"));
    markDown += generateListItem(generateLink("Questions", "#questions"));

    markDown += getHeading2("Installation");
    markDown += getHeading2("Usage");
    markDown += getHeading2("License");
    markDown += getHeading2("Contributing");
    markDown += getHeading2("Tests");
    markDown += getHeading2("Questions");

    return markDown;
};

function getHeading1(text) {
    return "# " + text + newLine;
};

function getHeading2(text) {
  return "## " + text + newLine;
};



function generateParagraph(text) {
    return newLine + text + newLine;
}

function generateLink(text, url){
  return "[" + text + "](" + url + ")";

}

function generateListItem(item){
  return "- " + item + newLine;
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