describe('test date', () => {
    it('test date',() => {
        const date = '16-12-12-2024'
        const dateArr = date.split('-');
        const futureTime = new Date(+dateArr[3], +dateArr[2] - 1, +dateArr[1], +dateArr[0]);
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
        expect(time).toBe("2-6-4-2")
    })
})