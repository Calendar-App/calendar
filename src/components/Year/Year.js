import React, { Component } from 'react';
import Month from '../Month/Month';
import './Year.css';

class Year extends Component {
    render() {
        // let year = new YearCreator(2018)
        return (
            <div className="Year">
                <div className="year-header">{this.props.year.year}</div>
                <div className="year-body">
                    {
                        this.props.year.months.map((month) => {
                            return (
                                <Month month={month} />
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export default Year;
