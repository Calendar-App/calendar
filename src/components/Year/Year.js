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
                            <Month month={month} selectWeek={this.props.selectWeek} />
                        )
                    })
                }
            </div>
        )
    }
}

export default Year;
