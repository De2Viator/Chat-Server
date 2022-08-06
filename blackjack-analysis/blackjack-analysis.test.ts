import { analysisGame } from "./blackjack-analysis";
import fs from 'fs'

describe('test blackjack-analysis', () => {
    it('test analysis', () => {
        fs.readFile('./logs.txt','utf-8',(err: Error| null, data: string) => {
            const results = analysisGame(data);
            expect(results.playerPlays).toBe(4);
            expect(results.playerDefeats).toBe(3);
            expect(results.playerWins).toBe(1);
            expect(results.userMaxDefeat).toBe(2);
            expect(results.userMaxWin).toBe(1);
            expect(results.userPercentOfWin).toBe(33.33333333333333)
        })
    })
})