import fs from 'fs';
import colors from 'colors';

fs.readFile('logs.txt','utf-8',(err,data) => {
    const playerGames = data.match(/Игрок (победил|проиграл)/g);
    const playerWins = data.match(/Игрок победил/g);
    const playerDefeats = data.match(/Игрок проиграл/g);
    let userPercentOfWin = 0;
    let userMaxWin = 1;
    let userMaxDefeat = 1;

    if(!playerWins || !playerDefeats) {
        userPercentOfWin = 0;
    } else {
        userPercentOfWin = playerWins.length/playerDefeats.length * 100;
    }

    for(let i =0; i < playerGames.length; i++) {
        if(playerGames[i] === playerGames[i-1] && playerGames[i] === 'Игрок победил') {
            userMaxWin++;
        }

        if(playerGames[i] === playerGames[i-1] && playerGames[i] === 'Игрок проиграл') {
            userMaxDefeat++;
        }
    }
    console.log(colors.blue(`Общее кол-во матчей: ${playerWins.length + playerDefeats.length}`));
    console.log(colors.yellow(`Процент выигрывания игрока: ${userPercentOfWin}%`))
    console.log(colors.green(`Кол-во побед игрока: ${+playerWins.length}`));
    console.log(colors.red(`Кол-во проигрышей игрока: ${+playerDefeats.length}`));
    console.log(colors.cyan(`Кол-во выигрышей подряд: ${userMaxWin}`));
    console.log(colors.white(`Кол-во проигрышей подряд: ${userMaxDefeat}`));
})