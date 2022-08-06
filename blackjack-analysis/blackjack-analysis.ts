import fs from 'fs';
import colors from 'colors';

export const analysisGame = (data: string) => {
    const playerGames: string[] | null | number = data.match(/Игрок (победил|проиграл)/g);
    let playerWins: string[] | null | number = data.match(/Игрок победил/g);
    let playerDefeats: string[] | null | number = data.match(/Игрок проиграл/g);
    let userPercentOfWin: number = 0;
    let userMaxWin: number = 1;
    let userMaxDefeat: number = 1;

    if (!playerWins || !playerDefeats) {
        userPercentOfWin = 0;
    } else {
        userPercentOfWin = playerWins.length / playerDefeats.length * 100;
    }

    if (playerGames) {
        for (let i = 0; i < playerGames.length; i++) {
            if (playerGames[i] === playerGames[i - 1] && playerGames[i] === 'Игрок победил') {
                userMaxWin++;
            }

            if (playerGames[i] === playerGames[i - 1] && playerGames[i] === 'Игрок проиграл') {
                userMaxDefeat++;
            }
        }
    }

    playerWins = playerWins ? playerWins.length : 0
    playerDefeats = playerDefeats ? playerDefeats.length : 0

    console.log(colors.blue(`Общее кол-во матчей: ${playerWins + playerDefeats}`));
    console.log(colors.yellow(`Процент выигрывания игрока: ${userPercentOfWin}%`))
    console.log(colors.green(`Кол-во побед игрока: ${+playerWins}`));
    console.log(colors.red(`Кол-во проигрышей игрока: ${+playerDefeats}`));
    console.log(colors.cyan(`Кол-во выигрышей подряд: ${userMaxWin}`));
    console.log(colors.white(`Кол-во проигрышей подряд: ${userMaxDefeat}`));

    return {
        playerPlays:playerWins + playerDefeats,
        userPercentOfWin,
        playerWins,
        playerDefeats,
        userMaxWin,
        userMaxDefeat,
    }
}

fs.readFile('logs.txt', 'utf-8', (err, data) => {
    analysisGame(data);
})

