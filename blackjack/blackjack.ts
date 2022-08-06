const inquirer = require('inquirer');
const consoleColors = require('colors');
const fs = require('fs');
const parhArgs = process.argv.slice(2);
const path = parhArgs[0];

export class Player {
    name: string = '';
    constructor(name: string) {
        this.name = name;
    }

    points: number = 0;
    isEndGame: boolean = false;
    getCard() {
        const points: number = Player.getRandom(0, 12);
        this.points += points;
        fs.writeFile(path, `${this.name} взял ${points} \n`, { flag: 'a', encoding: 'utf-8' }, (err: Error | null) => {
        })
    }

    drop() {
        if (!this.isEndGame) {
            if (this.points > 21 || this.points < 21) {
                console.log(`${this.name} проиграл`)
                fs.writeFile(path, `${this.name} проиграл \n`, { flag: 'a', encoding: 'utf-8' }, (err: Error | null) => {
                })
            } else {
                console.log(`${this.name} победил`)
                fs.writeFile(path, `${this.name} победил \n`, { flag: 'a', encoding: 'utf-8' }, (err: Error | null) => {
                })
            }
            this.isEndGame = true;
        }
    }

    static getRandom(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min) + min);
    }
}

const player = new Player('Игрок');
const enemy = new Player('Противник');

const enemyPart = () => {
    if (!enemy.isEndGame) {
        const choose = Player.getRandom(-2, 2);
        if (choose > 0) enemy.getCard();
        else enemy.drop();
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
    ).then((answers: any) => {
        if (answers['Ответ'] === 'Беру') {
            player.getCard();
            console.log(consoleColors.green(`Ваши очки:${player.points}`))
            enemyPart();
            ask();
        } else {
            player.drop();
            logResult();
        }
    })
}

const logResult = () => {
    if (player.isEndGame && enemy.isEndGame) {
        fs.writeFile('./logs.txt', `Очки игрока:${player.points} 
Очки противника:${enemy.points}`,
            { flag: 'a', encoding: 'utf-8' }, (err: Error | null) => {

            })
    }
}

ask();



