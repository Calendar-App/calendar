import React, { Component } from 'react';
import './Month.css';

import Day from '../Day/Day';

class Month extends Component {
    render() {
        let { month } = this.props
        let emptyDays = month.days[0].day + 1
        let afterDays = 7 - ((month.numOfDays + emptyDays - 1) % 7)
        for (let i = emptyDays; i; i--) {
            if (!Array.isArray(emptyDays)) emptyDays = []
            else emptyDays.push(null)
        }
        for (let i = afterDays; i; i--) {
            if (i === 7) break
            if (!Array.isArray(afterDays)) afterDays = []
            afterDays.push(null)
        }
        return (
            <div className="Month">
                <div className="month-header">{month.fullMonth}</div>
                <div className='day-of-week'>
                    <span>S</span>
                    <span>M</span>
                    <span>T</span>
                    <span>W</span>
                    <span>T</span>
                    <span>F</span>
                    <span>S</span>
                </div>
                <div className="month-body" onMouseLeave={() => this.props.hoverWeek(-1)} >
                    {
                        emptyDays.length ? 
                            emptyDays.map((item, i) => {
                                return (
                                    <div key={`${month.year}${month.month}${i}000`} className="day" onMouseEnter={() => this.props.hoverWeek(-1)} />
                                )
                            })
                            :
                            null
                    }
                    {
                        month.days.map((day) => {
                            return (
                                <Day
                                    key={`${month.year}${month.month}${day.date}`}
                                    day={day}
                                    selectWeek={this.props.selectWeek}
                                    hoverWeek={this.props.hoverWeek}
                                    color={this.props.color}
                                />
                            )
                        })
                    }
                    {
                        afterDays.length ?
                            afterDays.map((item, i) => {
                                return (
                                    <div key={`${month.year}${month.month}${i}000000`} className="day" onMouseEnter={() => this.props.hoverWeek(-1)} />
                                )
                            })
                            :
                            null
                    }
                </div>
            </div>
        )
    }
}

export default Month;
