import React, { Component } from 'react';
import './Day.css';

class Day extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }

        this.availability = this.availability.bind(this);
    }

    handleDayClick(week) {
        console.log('week', week);

    }

    availability() {
        return (!this.props.day.owner) ?

            <div className="available_day" onClick={() => this.props.selectWeek(this.props.day.week)}>
                {this.props.day.date}
            </div>
            :
            <div className="disabled_day" onClick={() => this.props.selectWeek(this.props.day.week)}>
                {this.props.day.date}
            </div>

    }

    render() {
        // console.log(this.props)
        return (
            <div className='day'>
                {this.availability()}
            </div>
        )
    }
}

export default Day;