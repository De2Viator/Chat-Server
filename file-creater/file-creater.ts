import fs from 'fs';

const getRandom = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const generateFile = (path:string) => {
  for (let i = 0; i < 5000; i++) {
    const firstNumb: number = getRandom(0, 850);
    const secondNumb: number = getRandom(0, 600);
    const thirdNumb: number = getRandom(0, 690);
    const data: string = `127.${firstNumb}.${secondNumb}.${thirdNumb} - - [25/May/2021:00:07:24 +0000] "POST /baz HTTP/1.1" 200 0 "-" "curl/7.47.0" \n`;
    fs.writeFile(path, data, { flag: 'a' }, () => {});
  }
};
generateFile('./example.txt');

export default {
  generateFile,
};
