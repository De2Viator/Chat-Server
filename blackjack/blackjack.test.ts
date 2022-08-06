import fs from 'fs';

describe('test blackjack', () => {
    const getRandomNumber = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min) + min);
    }
    it('test random number', () => {
        let number = getRandomNumber(1, 12);
        expect(number).toBeGreaterThan(0);
    })

    it('test get points', () => {
        let points = 0;
        points += getRandomNumber(1, 12);
        expect(points).toBeGreaterThan(0);
    })

    it('test drop game', () => {
        const points = 21;
        if (points > 21 || points < 21) {
            console.log(`test проиграл`)
            fs.writeFile('../logs-test.txt', `test проиграл \n`, { flag: 'a', encoding: 'utf-8' }, (err: Error | null) => {
            })
        } else {
            console.log(`test победил`)
            fs.writeFile('../logs-test.txt', `test победил \n`, { flag: 'a', encoding: 'utf-8' }, (err: Error | null) => {
            })
        }

        fs.readFile('../logs-test.txt', 'utf-8', (err, data) => {
            expect(data).toBe('test победил \n')
        })
    })

    it('test log system', () => {
        fs.writeFile('../logs-test.txt', `Очки игрока:20 
        Очки противника:20`,{ flag: 'a', encoding: 'utf-8' }, (err: Error | null) => {})

        fs.readFile('../logs-test.txt','utf-8',(err,data:string) => {
            expect(data).toContain('Очки противника:20')
        })
    })
})