import fs from "fs";
import inquirer from "inquirer";
import pathLib from "path";

const args = process.argv.slice(2);
const executionDir = args[0];

const fileFilter = (fileOrDir) => fs.lstatSync(fileOrDir).isFile();
let list = fs.readdirSync(args[0]);
const pattern = args[1];
list = list.filter((item) => new RegExp(pattern).exec(item))


const askFile = (path, choices) => {
  inquirer
    .prompt([
      {
        name: "fileName",
        type: "list",
        message: "Выберите файл для чтения",
        choices:choices,
      },
    ])
    .then((answer) => {
      const fullFilePath = pathLib.join(path, answer.fileName);
      console.log(list)
      if(fileFilter(fullFilePath)) {
        fs.readFile(fullFilePath, "utf-8", (err, data) => {
          console.log(data)
        });
      } else {
        list = fs.readdirSync(fullFilePath);
        askFile(fullFilePath,list);
      }
    });
};

askFile(executionDir,list);
