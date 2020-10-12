const path = require("path");
const fs = require("fs");
const endOfLine = require("os").EOL;

// Typescript does not allow to include in the transpilation output a custom d.ts file
// Merge the generated Typescript definitions with a custom d.ts file

// Copy the custom d.ts file to the dist folder
fs.copyFileSync(
  path.join(__dirname, "/src/commands/commands.d.ts"),
  path.join(__dirname, "/dist/commands/commands.d.ts")
);

const indexFile = path.join(__dirname, "/dist/index.d.ts");
const index = fs.readFileSync(indexFile);

// And merge it
const result = `/// <reference path="./commands/commands.d.ts" />${endOfLine}${index}`;
fs.writeFileSync(indexFile, result);
