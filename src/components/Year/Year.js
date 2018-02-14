import React, { Component } from 'react';
import Month from '../Month/Month';
import './Year.css';

class Year extends Component {
    render() {
        return (
            <div className="Year">
                {
                    this.props.year.months.map((month) => {
                        return (
                            <Month
                                key={`${month.year}${month.month}`}
                                month={month}
                                selectWeek={this.props.selectWeek}
                                selectedWeek={this.props.selectedWeek}
                                selectedWeeks={this.props.selectedWeeks}
                                hoverWeek={this.props.hoverWeek}
                                hoveredWeek={this.props.hoveredWeek}
                                color={this.props.color}
                                currentUser={this.props.currentUser}
                            />
                        )
                    })
                }
            </div>
        )
    }
}

export default Year;
