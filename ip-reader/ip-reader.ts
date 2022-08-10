import fs from "fs";
import readline from "readline";

const readFile = () => {
  const read = fs.createReadStream("./example.txt", "utf-8");
  const rl = readline.createInterface({
    input: read,
  });

  let auth = true;

  rl.on("line", (line: string) => {
    const addressArr = line.split(" ");
    if(!auth) addressArr[0] = 'Hidden Address';
    let finishAddress = addressArr.join(' ');
    finishAddress += ' \n'
    fs.writeFile('./ip-adresses.txt',finishAddress,{flag:'a'}, (err) => {
      console.log(err)
    })
  });
};

readFile();
