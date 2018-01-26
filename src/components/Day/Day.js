import React, { Component } from 'react';
import './Day.css';

class Day extends Component {
    constructor(props) {
        super(props)



        this.availability = this.availability.bind(this);
    }


    availability() {
        return (!this.props.day.owner) ?

        // only changing background of that specific day... need to make mouseOver change the entire week's background
            <div title={this.props.day.holiday} className={ this.props.day.holiday ? "holiday" : "available_day"} onClick={() => this.props.selectWeek(this.props.day.week)} >  
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