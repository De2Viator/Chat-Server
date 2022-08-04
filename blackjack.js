import inquirer from "inquirer";
import colors from 'colors';

class Player {
    constructor(name) {
        this.name = name;
     }
    points = 0;
    isEndGame = false;
    getCard() {
        this.points += Player.getRandom(0, 12)
    }

    drop() {
        if(!this.isEndGame) {
            if (this.points > 21 || this.points < 21) {
                console.log(`${this.name} проиграл`)
            } else {
                console.log(`${this.name} победил `)
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
    const choose = Player.getRandom(-2,2);
    if( choose > 0) enemy.getCard();
    else enemy.drop(enemy.points);
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
        }
    })
}

ask();


