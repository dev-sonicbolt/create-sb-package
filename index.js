#!/usr/bin/env node

import { createPromptModule } from "inquirer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const CURR_DIR = process.cwd();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const prompt = createPromptModule();

const QUESTIONS = [
  {
    name: "package-name",
    type: "input",
    message: "Package name:",
    validate: function (input) {
      if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
      else
        return "Package name may only include letters, numbers, underscores and hashes.";
    },
  },
  {
    name: "package-description",
    type: "input",
    message: "Description:",
    default: "",
  },
  {
    name: "github-url",
    type: "input",
    message: "Github Repo URL:",
    default: "https://github.com/sonicbolt-dev/{repoName}",
  },
];

prompt(QUESTIONS).then((answers) => {
  const packageName = answers["package-name"];
  const pakageDescription = answers["package-description"];
  const repoURL = answers["github-url"];

  const templatePath = `${__dirname}/template`;

  const packageJsonProperties = {
    name: packageName,
    description: pakageDescription,
    repository: {
      type: "git",
      url: repoURL,
    },
  };

  fs.mkdirSync(`${CURR_DIR}/${packageName}`);
  createDirectoryContents(templatePath, packageName);
  const packageJson = `${CURR_DIR}/${packageName}/package.json`;
  const pathToReadMeFile = `${CURR_DIR}/${packageName}/README.md`;

  // rewrite package.json file
  rewritePackageJson(packageJson, packageJsonProperties);

  const readmeContent =
    `# **${packageName}**
  
  ## **Perquisites**
  
  Every time you clone this repo or before installing running ` +
    "```npm i```" +
    `, make sure you have a ` +
    "```.npmrc```" +
    ` file in your package folder_.
  
  After downloading, paste the ` +
    "```.npmrc```" +
    ` file at the root of your package folder.
  
  ## **Installation**
  
  Install in the pcakage folder using

    npm install @sonicbolt-dev/${packageName}
  
  # **For Contributors**
  
  ## **Installing**
  
  After copying the ` +
    "```.npmrc```" +
    ` file, Run 
    npm i
  
  ## **Run Storybook**
  
     npm run storybook 
  
  ## **Build and Version**
  - create the feature branch from main
     
  - make changes
     
  - commit changes
     
  - push changes to feature branch
     
  - Run npm version patch/minor/major accordingly

    For small changes

        npm version patch 

    For minor changes

        npm version minor 

    For major changes

        npm version major 
        
  - push changes to feature branch
     
  - npm run build
     
  - npm publish
     
  - create PR to main
  `;

  //update readmecontent
  updateReadMeFile(pathToReadMeFile, readmeContent);

  console.log(`1. cd ${packageName} && npm install`);
});

function createDirectoryContents(templatePath, newProjectPath) {
  const filesToCreate = fs.readdirSync(templatePath);

  filesToCreate.forEach((file) => {
    const origFilePath = `${templatePath}/${file}`;

    // get stats about the current file
    const stats = fs.statSync(origFilePath);

    if (stats.isFile()) {
      const contents = fs.readFileSync(origFilePath, "utf8");

      // Rename
      if (file === ".npmignore") file = ".gitignore";

      const writePath = `${CURR_DIR}/${newProjectPath}/${file}`;
      fs.writeFileSync(writePath, contents, "utf8");
    } else if (stats.isDirectory()) {
      fs.mkdirSync(`${CURR_DIR}/${newProjectPath}/${file}`);

      // recursive call
      createDirectoryContents(
        `${templatePath}/${file}`,
        `${newProjectPath}/${file}`
      );
    }
  });
}

function rewritePackageJson(pathTopackageJson, properties) {
  const packageJson = JSON.parse(fs.readFileSync(pathTopackageJson, "utf-8"));

  const newPackageJson = JSON.stringify(
    { ...packageJson, ...properties },
    null,
    2
  );
  fs.writeFileSync(pathTopackageJson, newPackageJson);
}

function updateReadMeFile(pathToReadMeFile, content) {
  fs.writeFileSync(pathToReadMeFile, content);
}
