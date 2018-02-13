import React, { Component } from 'react';
import Month from '../Month/Month';
import './Year.css';

class Year extends Component {
    render() {
        // let year = new YearCreator(2018)
        return (
            <div className="Year">
                {
                    this.props.year.months.map((month) => {
                        return (
                            <Month
                                key={`${month.year}${month.month}`}
                                month={month}
                                selectWeek={this.props.selectWeek}
                                selectedWeeks={this.props.selectedWeeks}
                                hoverWeek={this.props.hoverWeek}
                                hoveredWeek={this.props.hoveredWeek}
                                color={this.props.color}
                            />
                        )
                    })
                }
            </div>
        )
    }
}

export default Year;
