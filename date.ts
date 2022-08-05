const args = process.argv.slice(2);
args.forEach((date: string) => {
    const dateArr = date.split('-');
    const futureTime = new Date(+dateArr[3], +dateArr[2] - 1, +dateArr[1], +dateArr[0]);
    setInterval(() => {
        const realTime = new Date();
        let year = 0;
        let month = 0;
        let day = 0;
        let hour = 0;
        year = futureTime.getFullYear() - realTime.getFullYear();

        if (futureTime.getMonth() < realTime.getMonth()) {
            month = 12 + futureTime.getMonth() - realTime.getMonth();
            year--;
        } else {
            month = futureTime.getMonth() - realTime.getMonth();
        }

        if (futureTime.getDate() < realTime.getDate()) {
            if (realTime.getMonth() === 2) {
                day = 28 - realTime.getDate() + futureTime.getDate();
            } else if (realTime.getMonth() % 2 || realTime.getMonth() === 8) {
                day = 31 - realTime.getDate() + futureTime.getDate();
            } else {
                day = 30 - realTime.getDate() + futureTime.getDate();
            }
            month--;
        } else {
            day = futureTime.getDate() - realTime.getDate();
        }

        if(futureTime.getHours() < realTime.getHours()) {
            hour = 24 + futureTime.getHours() - realTime.getHours();
            day--;
        } else {
            hour = futureTime.getHours() - realTime.getHours();
        }


        const time = `${hour}-${day}-${month}-${year}`;
        console.log(time)
    }, 1000);
})