import { Command } from 'commander';
import ansi from 'ansi';
const program = new Command();

program
    .name('Число для вывода')
    .description('CLI для вывода наибольшего числа')
    .version('1.0.0');

program.command('sort')
    .description('В консоль отобразится наибольшее число')
    .argument('<[numbers]>', 'массив для ввода')
    .action((str) => {
        const numbers = JSON.parse(str);
        console.log(numbers)
        const sortedNumbers = numbers.sort();
        const num = sortedNumbers.at(-1);
        const cursor = ansi(process.stdout)
        cursor.brightCyan().bg.black().write(`${num}`).bg.reset();
        cursor.reset();
    });

program.parse();