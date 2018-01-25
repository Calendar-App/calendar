
class Day {
    constructor(date, week) {
        this.date = date.getDate()
        this.day = date.getDay()
        switch (this.day) {
            case 0:
                this.fullDay = 'Sunday'
                break;
            case 1:
                this.fullDay = 'Monday'
                break;
            case 2:
                this.fullDay = "Tuesday"
                break;
            case 3:
                this.fullDay = "Wednesday"
                break;
            case 4:
                this.fullDay = "Thursday"
                break;
            case 5:
                this.fullDay = "Friday"
                break;
            case 6:
                this.fullDay = "Saturday"
                break;
        }
        this.owner = null
        this.week = this.day === 6 ? week.number++ : week.number
    }
}

class Month {
    constructor(date, week) {
        this.month = date.getMonth()
        this.year = date.getFullYear()
        switch (this.month) {
            case 0:
                this.fullMonth = 'January'
                this.numOfDays = 31
                break;
            case 1:
                this.fullMonth = 'February'
                this.numOfDays = this.year % 4 === 0 ? 29 : 28
                break;
            case 2:
                this.fullMonth = 'March'
                this.numOfDays = 31
                break;
            case 3:
                this.fullMonth = 'April'
                this.numOfDays = 30
                break;
            case 4:
                this.fullMonth = 'May'
                this.numOfDays = 31
                break;
            case 5:
                this.fullMonth = 'June'
                this.numOfDays = 30
                break;
            case 6:
                this.fullMonth = 'July'
                this.numOfDays = 31
                break;
            case 7:
                this.fullMonth = 'August'
                this.numOfDays = 31
                break;
            case 8:
                this.fullMonth = 'September'
                this.numOfDays = 30
                break;
            case 9:
                this.fullMonth = 'October'
                this.numOfDays = 31
                break;
            case 10:
                this.fullMonth = 'November'
                this.numOfDays = 30
                break;
            case 11:
                this.fullMonth = 'December'
                this.numOfDays = 31
                break;
        }
        this.days = []
        for (let i = 0; i < this.numOfDays; i++) {
            let date = new Date(this.year, this.month, i + 1)
            this.days.push(new Day(date, week))
        }
    }
}

class Year {
    constructor(year) {
        this.year = year
        this.firstDay = new Date(year, 0, 1)
        this.firstDay = this.firstDay.getDay()
        this.week = {
            number: this.firstDay === 6 ? 1 : 0
        }
        this.months = []
        for (let i = 0; i < 12; i++) {
            let date = new Date(year, i, 1)
            this.months.push(new Month(date, this.week))
        }
    }
}
