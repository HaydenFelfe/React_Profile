// TODO: Include packages needed for this application
const inquirer = require ('inquirer');
const fs = require('fs');
const generateMarkdown = require('./utils/generateMarkdown');
// TODO: Create an array of questions for user input
const questions = [
{
 type: 'input',
 message: 'What is the title of your project?',
 name: 'title',
},
{
 type: 'input',
 message: 'What is the description of your project?',
 name: 'description',
},
{
 type: 'input',
 message: 'What are the installation instuctions of your project?',
 name: 'installation',
},
{
 type: 'input',
 message: 'Please provide usage information.',
 name: 'usage',
},
{
 type: 'input',
 message: 'Please provide contribution guidelines.',
 name: 'contribution',
},
{
 type: 'input',
 message: 'Please provide test instructions',
 name: 'test',
},
{
    type: 'list',
    message: 'Choose a license for your application:',
    choices: [
      'MIT License',
      'Apache License 2.0',
      'GNU GPLv3',
      'ISC License',
      'No License'
    ],
    name: 'license',
  },
{
type: 'input',
message: 'What is your GithHub username?',
name: 'githubUsername',
},
{
 type: 'input',
 message: 'What is your email address?',
 name: 'email',
},
];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
  const markdown = generateMarkdown(data);
  const readMeContent = `
${markdown}

## Table of Contents
[Installation](#installation)
[Usage](#usage)
[Contribution](#contribution)
[Test](#test)
[License](#license)
   
## Installation
${data.installation}

## Usage
${data.usage}

## Contribution
${data.contribution}

## Test
${data.test}

## License
This application is covered under the ${data.license}

## Questions
if you have any questions about this application please feel free to reach out to me via email or GitHub
Github: - [${data.githubUsername}](https://github.com/${data.githubUsername})
Email: - ${data.email}
`
   fs.writeFile(fileName, readMeContent, (err) => {
    if(err) {
        console.log(err);
        return;
    }
    console.log('README file generated successfully!')
});
}


// TODO: Create a function to initialize app
function init() {
  console.log('Application Initialized!');
  inquirer.prompt(questions).then((answers)=>{
    writeToFile('README.md', answers);
    });
}


// Function call to initialize app
init();
