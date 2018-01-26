import React, { Component } from 'react';
import './Month.css';

import Day from '../Day/Day';

class Month extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        console.log(this.props)
        let { month } = this.props
        let emptyDays = month.days[0].day + 1
        if (emptyDays === 7) emptyDays = 0
        console.log(emptyDays)
        for (let i = emptyDays; i; i--) {
            if (!Array.isArray(emptyDays)) emptyDays = []
            else emptyDays.push(null)
        }
        return (
            <div className="Month">
                <div className="month-header">{month.fullMonth}</div>
                <div className="month-body">
                    {
                        emptyDays.length ? 
                            emptyDays.map((item, i) => {
                                console.log(i)
                                return (
                                    <div className="day" />
                                )
                            })
                            :
                            null
                    }
                    {
                        month.days.map((day) => {
                            return (
                                <Day key={`${month.year}${month.month}${day.date}`} day={day} 
                                selectWeek={this.props.selectWeek} color={this.props.color}
                                />
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export default Month;
