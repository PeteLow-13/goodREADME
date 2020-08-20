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
    type: 'list',
    name: 'licenseBadge',
    message: 'Select a license your project is covered under',
    choices:['MIT', 'BSD', 'Apache', 'LGPL', "MPL"],
    default: 'No License',
  },
  {
    type: 'input',
    name: 'license',
    message: 'Explain which license that your project is covered under',
    default: 'License',
  }, 
  {
    type: 'input',
    name: 'contributing',
    message: 'What are the guidelines to contribute to your project?',
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
    message: 'What would you like to say to direct people to contact you with questions?(you will be prompted for contact info next)',
    default: 'Contact me via email or github with questions',
  },
  {
    type: 'input',
    name: 'email',
    message: 'What is your email for questions?',
    default: 'Email',
  },
  {
    type: 'input',
    name: 'github',
    message: 'What is your github profile for question?',
    default: 'github',
  },
  
];

function generateMD(answers) {
    var markDown = "";
    markDown += getHeading1(answers.title);
    markDown += getLicenseBadge(answers.licenseBadge)
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
    //change this to create list items
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
    markDown += generateListItem(answers.email)
    
    markDown += generateListItem(answers.github)

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

function getLicenseBadge(item){
  return  "Badge" + item + newLine;
}
function generateGitHubLink(text){
  return [`\${answer.github}\`](https://github.com/${answer.github});

  
}

Project Home Page: ${data.homePage}
* Project Github: ${data.github}
* Author: [\`${data.author}\`](https://github.com/${data.author})

inquirer.prompt(questions).then((answers) => {
    fs.writeFile("README.md", generateMD(answers), function(){

    });
  });
  
// console.log("hello world")
