import { chooseNumber, isPrime } from "./numbersAndColors"

describe('test numbersAndColors', () => {
    it('test isPrime', () => {
        expect(isPrime(3)).toBe(true);
    })

    it('test number', () => {
        expect(chooseNumber(11,0)).toBe('green')
    })
})
