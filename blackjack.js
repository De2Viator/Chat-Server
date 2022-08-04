import inquirer from "inquirer";
import colors from 'colors';
import fs from 'fs';

const args = process.argv.slice(2);
const path = args[0];

class Player {
    constructor(name) {
        this.name = name;
    }

    points = 0;
    isEndGame = false;
    getCard() {
        const points = Player.getRandom(0, 12);
        this.points += points;
        fs.writeFile(path, `${this.name} взял ${points} \n`,{flag:'a',encoding:'utf-8'},(err) => {
        })
    }

    drop() {
        if(!this.isEndGame) {
            if (this.points > 21 || this.points < 21) {
                console.log(`${this.name} проиграл`)
                fs.writeFile(path, `${this.name} проиграл \n`,{flag:'a',encoding:'utf-8'}, (err) => {
                })
            } else {
                console.log(`${this.name} победил`)
                fs.writeFile(path, `${this.name} победил \n`, {flag:'a',encoding:'utf-8'},(err) => {
                })
            }
            this.isEndGame = true;
        }
    }

    static getRandom(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
}

const player = new Player('Игрок');
const enemy = new Player('Противник');

const enemyPart = () => {
    if(!enemy.isEndGame) {
        const choose = Player.getRandom(-2,2);
        if( choose > 0) enemy.getCard();
        else enemy.drop(enemy.points);
    }
}

const ask = () => {
    inquirer.prompt(
        {
            type: 'list',
            message: 'Берете или пасуете?',
            name: 'Ответ',
            choices: ['Беру', 'Пасую']
        }
    ).then(answers => {
        if(answers['Ответ'] === 'Беру') {
            player.getCard();
            console.log(colors.green(`Ваши очки:${player.points}`))
            enemyPart();
            ask();
        } else {
            player.drop(player.points);
            logResult();
        }
    })
}

const logResult = () => {
    if(player.isEndGame && enemy.isEndGame) {
        fs.writeFile('./logs.txt',`Очки игрока:${player.points} 
Очки противника:${enemy.points}`,
        {flag:'a',encoding:'utf-8'},(err) => {

        })
    }
}

ask();



