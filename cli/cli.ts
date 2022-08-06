import { Command } from 'commander';
import ansi from 'ansi';
const program = new Command();

export const sortNumber = (str: string) => {
    const numbers = JSON.parse(str);
    const sortedNumbers: number[] = numbers.sort();
    const num: number | undefined = sortedNumbers.at(-1);
    return num;
}

program
    .name('Число для вывода')
    .description('CLI для вывода наибольшего числа')
    .version('1.0.0');

program.command('sort')
    .description('В консоль отобразится наибольшее число')
    .argument('<[numbers]>', 'массив для ввода')
    .action((str: string) => {
        const num = sortNumber(str)
        const cursor = ansi(process.stdout)
        cursor.brightCyan().bg.black().write(`${num}`).bg.reset();
        cursor.reset();
    });

program.parse();
