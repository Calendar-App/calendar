import React, { Component } from 'react';
import './Day.css';

class Day extends Component {
    constructor(props) {
        super(props)
        this.availability = this.availability.bind(this);
    }


    // if user is not admin
    // unavailable days are gray
    // selected days are the selected color
    // hover days are the selected color with opacity 50%
    // 
    // holidays are always slightly darker
    // unavailable days are always unselectable
    // 
    // if user is admin ... 

    handleClick = () => {
        console.log(this.props.day)
        if (this.props.day.owner) return
        else this.props.selectWeek(this.props.day.week)
    }



    availability() {
        return (!this.props.day.owner) ?

            // only changing background of that specific day... need to make mouseOver change the entire week's background
            <div title={this.props.day.holiday || ''} className={this.props.day.holiday ? "holiday" : "available_day"} >
                {this.props.day.date}
            </div>
            :
            <div className="disabled_day" >
                {this.props.day.date}
            </div>

    }

    render() {
        // console.log(this.props)
        let { day } = this.props
        let style = {}
        // styles for a day that is hovered over
        if (day.week === this.props.hoveredWeek || day.week === this.props.selectedWeek) {
            style = {
                background: this.props.color,
                opacity: 0.75,
                color: "white"
            }
        }
        // styles for a day that has been selected - this overrides the hover
        if (this.props.selectedWeeks.includes(day.week)) {
            style = {
                background: this.props.color,
                opacity: 1
            }
        }
        // styles for a day that has been already selected by someone else - this overrides both the selected and the hovered styles
        if (day.owner) {
            style = {
                background: 'rgba(0,0,0,0.25)',
                opacity: 1
            }
        }
        return (
            <div
                style={style}
                className={day.week === this.props.hoveredWeek ? 'day hover' : 'day'}
                onMouseEnter={() => this.props.hoverWeek(day.week)}
                onClick={this.handleClick} 
                >
                {/* DAY */}
                {this.availability()}
                {/* HOLIDAY LABEL */}
                {
                    day.holiday && !day.owner ?
                        <div className="holiday">
                            <div style={{}} className="holiday-description">
                                {day.holiday}
                            </div>
                        </div>
                        :
                        null
                }
            </div>
        )
    }
}

export default Day;