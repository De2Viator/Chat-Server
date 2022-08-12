import express from "express";
import { Request, Response } from "express";
import  fs from "fs";

let files:string[] = [];
let globalPath = './';
let page = `
<form action="http://localhost:3000/" method="post">
    <legend>Путь к файлу</legend>
    <fieldset>
        <input name="filePath" type="text">
    </fieldset>
    <fieldset>
        <ul id="pathes">
        ${files}
        </ul>
    </fieldset>
    <button type="submit">Отправить</button>
</form>`;
const fileFilter = (fileOrDir: fs.PathLike) => fs.lstatSync(fileOrDir).isFile();

const getDirectoriesAndSendPage = (path:string,res:Response) => {
    const list:string[] = fs.readdirSync(path);
    const filesLinks:string[] = []
    for(path of list) {
        const item = `<li><input type="radio" name="fileName" value=${path}>${path}</li>`
        filesLinks.push(item)
    }
    files = [...filesLinks];
    page = `
    <form action="http://localhost:3000/" method="post">
        <legend>Путь к файлу</legend>
        <fieldset>
            <input name="filePath" type="text">
        </fieldset>
        <fieldset>
            <ul id="pathes">
            ${files}
            </ul>
        </fieldset>
        <button type="submit">Отправить</button>
    </form>`
    res.send(page);
};

const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended:true
}));

app
.get("/", (req: Request, res: Response) => {
  getDirectoriesAndSendPage('./',res);
})
.post("/", (req: Request, res: Response) => {
  const body:{filePath:string, fileName:string} = req.body;
  
  if(body.fileName) {
    if(fileFilter(globalPath +`\\${body.fileName}`)) {
        globalPath += `${body.fileName}/`
        const file = fs.readFileSync(globalPath,'utf-8');
        res.send(file);
    } else {
        globalPath += `${body.fileName}/`
        getDirectoriesAndSendPage(globalPath,res)
    }
  } else {
    globalPath = body.filePath;
    getDirectoriesAndSendPage(globalPath,res)
  }
});

app.listen(3000, () => {
  console.log("Listen port 3000");
});
