import React, { Component } from 'react';
import Month from '../Month/Month';
import YearCreator from '../../year-creator';

class Year extends Component {
    render() {
        let year = new YearCreator(2018)
        return (
            <div className="Year">
                {
                    year.months.map((month) => {
                        return (
                            <Month month={month} />
                        )
                    })
                }
            </div>
        )
    }
}

export default Year;
