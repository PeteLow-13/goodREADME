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
{
    type: 'input',
    name: 'installation',
    message: 'What are the insallation instuctions for your project?',
    default: 'Installation',
  },
  {
    type: 'input',
    name: 'usage',
    message: 'What is the usage your project?',
    default: 'Usage',
  },
  {
    type: 'input',
    name: 'license',
    message: 'What is the license for your project?',
    default: 'License',
  },
  {
    type: 'input',
    name: 'contributing',
    message: 'Who is contributing to your project?',
    default: 'Contributing',
  },
  {
    type: 'input',
    name: 'tests',
    message: 'What are the tests for your project?',
    default: 'Tests',
  },
  {
    type: 'input',
    name: 'questions',
    message: 'What are the questions for your project?',
    default: 'Questions',
  },
  
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
    markDown += generateParagraph(answers.installation);
    markDown += getHeading2("Usage");
    markDown += generateParagraph(answers.usage);
    markDown += getHeading2("License");
    markDown += generateParagraph(answers.license);
    markDown += getHeading2("Contributing");
    markDown += generateParagraph(answers.contributing);
    markDown += getHeading2("Tests");
    markDown += generateParagraph(answers.tests);
    markDown += getHeading2("Questions");
    markDown += generateParagraph(answers.questions);

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