
const holiday = date => {
    let month = date.getMonth()
    let day = date.getDay()
    date = date.getDate()
    if (month === 0) {
        if (date === 1) return "New Years"
        if (day === 1 && (date > 14 && date < 22)) return "Martin Luther King Jr Day"
    }
    if (month === 1) {
        if (day === 1 && (date > 14 && date < 22)) return "Presidents Day"
    }
    if (month === 1) {
        if (day === 1 && (date > 24)) return "Memorial Day"
    }
    if (month === 6) {
        if (date === 4) return "Independence Day"
    }
    if (month === 8) {
        if (day === 1 && (date < 8)) return "Labor Day"
    }
    if (month === 9) {
        if (day === 1 && (date > 7 && date < 15)) return "Columbus Day"
    }
    if (month === 10) {
        if (date === 11) return "Veterans Day"
        if (day === 4 && (date > 21 && date < 29)) return "Thanksgiving"
    }
    if (month === 11) {
        if (date === 25) return "Christmas"
    }
    return false
}

class Day {
    constructor(date, week) {
        this.date = date.getDate()
        this.day = date.getDay()
        this.month = date.getMonth()
        this.holiday = holiday(date)
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
        this.week = this.day === 6 ? ++week.number : week.number
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
    getHolidays() {
        return this.days.filter(day => day.holiday)
    }
}

class Year {
    constructor(year) {
        this.year = year
        this.firstDay = new Date(year, 0, 1)
        this.firstDay = this.firstDay.getDay()
        let week = {
            number: this.firstDay === 6 ? 1 : 0
        }
        this.months = []
        for (let i = 0; i < 12; i++) {
            let date = new Date(year, i, 1)
            this.months.push(new Month(date, week))
        }
    }
    getHolidays() {
        let holidays = []
        this.months.map(month => {
            month.days.map(day => {
                if (day.holiday) holidays.push(day)
            })
        })
        return holidays
    }
    selectWeekForUser(user, week) {
        this.months = this.months.map(month => {
            month.days = month.days.map(day => {
                if (day.week === week) day.owner = user
                return day
            })
            return month
        })
    }
    removeWeekFromUser(user, week) {
        this.months = this.months.map(month => {
            month.days = month.days.map(day => {
                if (day.owner === user && day.week === week) day.owner = null
                return day
            })
            return month
        })
    }
    getDatesByUser(user) {
        let dates = []
        this.months.map(month => {
            month.days.map(day => {
                if (day.owner === user) dates.push(day)
            })
        })
        return dates
    }
}

export default Year
