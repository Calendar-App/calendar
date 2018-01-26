import React, { Component } from 'react';
import './Day.css';

class Day extends Component {
    constructor(props) {
        super(props)

        this.state = {
            hoverWeek: null
        }

        this.availability = this.availability.bind(this);
    }


    handleMouseEnter(week) {
        // console.log(week)
        this.setState({
            hoverWeek: week
        })
    }

    availability() {
        return (!this.props.day.owner) ?

        // only changing background of that specific day... need to make mouseOver change the entire week's background
            <div className="available_day" onClick={() => this.props.selectWeek(this.props.day.week)} onMouseEnter={ () => this.handleMouseEnter(this.props.day.week)} >  
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