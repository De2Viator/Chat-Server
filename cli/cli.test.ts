describe('test cli', () => {
    it('Test number',() => {
        const testString = '[2,3,4]'
        const numbers = JSON.parse(testString);
        const sortedNumbers: number[] = numbers.sort();
        const num: number | undefined = sortedNumbers.at(-1);
        expect(num).toBe(4)
    })
})