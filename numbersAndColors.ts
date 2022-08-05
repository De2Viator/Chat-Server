const colors = require('colors');
const minimist = require('minimist');

const minArg = minimist(process.argv.slice(2));
const processes = minArg._

const isPrime = (n: number) => {
    for (let i = 2; i <= Math.sqrt(n); i++)
        if (n % i == 0) {
            return false;
        }
    return true;
}

for (let i = 0; i < 3; i++) {
    const process = +processes[i];
    if (!isNaN(process)) {
        if (isPrime(process)) {
            switch (i) {
                case 0: {
                    console.log(colors.green(process));
                    break;
                }
                case 1: {
                    console.log(colors.yellow(process));
                    break;
                }
                case 2: {
                    console.log(colors.red(process));
                    break;
                }
            }
        } else {
            console.log(colors.red('Число не является простым'))
        }
    } else {
        console.log(colors.red('Аргумент не является числом!!'))
    }
}