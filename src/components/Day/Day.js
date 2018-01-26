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
    // if user is admin
    // 
    // 
    // 
    // 

    handleClick = () => {
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
        let style = {}
        if (this.props.day.hover) {
            style = {
                background: this.props.color,
                opacity: 0.75,
                color: "white"
            }
        }
        if (this.props.day.selected) {
            style = {
                background: this.props.color,
                opacity: 1
            }
        }
        if (this.props.day.owner) {
            style = {
                background: 'rgba(0,0,0,0.25)',
                opacity: 1
            }
        }
        return (
            <div style={style} className={this.props.day.hover ? 'day hover' : 'day'} onMouseEnter={() => this.props.hoverWeek(this.props.day.week)} onClick={this.handleClick} >
                {this.availability()}
                {
                    this.props.day.holiday && !this.props.day.owner ?
                        <div className="holiday">
                            <div style={{}} className="holiday-description">
                                {this.props.day.holiday}
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