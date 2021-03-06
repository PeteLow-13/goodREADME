const fs = require('fs');
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
    message: 'What is the usage of your project?',
    default: 'Usage',
  },
  {
    type: 'list',
    name: 'licenseBadge',
    message: 'Select a license your project is covered under',
    choices:['ISC', 'MIT', 'BSD', 'Apache', 'LGPL', 'MPL', 'GPL'],
    default: 'No License',
  },
  {
    type: 'input',
    name: 'license',
    message: 'Explain which license the project is covered under',
    default: 'License',
  }, 
  {
    type: 'input',
    name: 'languages',
    message: 'What languages are used in the project?',
    default: 'Languages',
  },
  {
    type: 'input',
    name: 'tests',
    message: 'What are the tests for the project?',
    default: 'Tests',
  },
  {
    type: 'input',
    name: 'repositoryURL',
    message: 'What is the url for the project repository?',
    default: 'repository',
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
    message: 'What is your email?',
    default: 'Email',
  },
  {
    type: 'input',
    name: 'github',
    message: 'What is your github user name?',
    default: 'github',
  },
  
];

function generateMD(answers) {
    var markDown = '';
    
    markDown += getHeading1(answers.title);
    markDown += `[![License: ${ answers.licenseBadge }](https://img.shields.io/badge/License-${ answers.licenseBadge }-green.svg)](https://opensource.org/licenses/${ answers.licenseBadge })` + newLine;
    markDown += getHeading2('Description');
    markDown += generateParagraph(answers.description);

    markDown += getHeading2('Table of Contents');
    markDown += generateListItem(generateLink('Usage', '#usage'));
    markDown += generateListItem(generateLink('Installation', '#installation'));
    markDown += generateListItem(generateLink('License', '#license'));
    markDown += generateListItem(generateLink('Languages', '#languages'));
    markDown += generateListItem(generateLink('Tests', '#tests'));
    markDown += generateListItem(generateLink('Questions', '#questions'));

    markDown += generateParagraph(answers.description);
    markDown += getHeading2('Usage');
    markDown += generateParagraph(answers.usage);
    markDown += getHeading2('Installation');
    markDown += generateParagraph(answers.installation);
    markDown += getHeading2('License');
    markDown += generateParagraph(answers.license);
    markDown += getHeading2('Languages');
    markDown += generateParagraph(answers.languages);
    markDown += getHeading2('Tests');
    markDown += generateParagraph(answers.tests);
    markDown += getHeading2('Repository');
    markDown += generateListItem(answers.repositoryURL)
    markDown += getHeading2('Questions');
    markDown += generateParagraph(answers.questions);
    markDown += generateListItem(answers.email);
    markDown += generateListItem(generateGithublink(answers.github));

    return markDown;
};

function getHeading1(text) {
    return '# ' + text + newLine;
};

function getHeading2(text) {
  return '## ' + text + newLine;
};

function generateParagraph(text) {
    return newLine + text + newLine;
}

function generateLink(text, url){
  return '[' + text + '](' + url + ')';
}

function generateListItem(item){
  return '- ' + item + newLine;
}

function generateGithublink(text){
  return '[' + text + '](http://github.com/' + text + ')';
}

inquirer.prompt(questions).then((answers) => {
  fs.writeFile('README.md', generateMD(answers), function(){

  });
});




