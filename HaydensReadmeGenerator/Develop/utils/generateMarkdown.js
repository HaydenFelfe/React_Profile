// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {
  if (license) {
    return `
[![License](https://img.shields.io/badge/license-${license}-blue.svg)](LICENSE)
`;
  } else {
    return '';
  }
}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {
  if (license) {
    return '[License](LICENSE)';
  } else {
    return '';
  }
}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {
  if (license) {
    return `
## License

This project is licensed under the ${license} license. If you want more information on the license click [here](${renderLicenseLink(license)})
    `
  }
  else{
  return ' ';
  }
  }


// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {
  return `
# ${data.title}
  
${renderLicenseBadge(data.license)}

## Description
  
${data.description}
  
${renderLicenseSection(data.license)}
  
`;
}

module.exports = generateMarkdown;
