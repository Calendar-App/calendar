import React, { Component } from 'react';
import Month from './components/Month/Month';
import yearCreator from '../../year-creator';

class Year extends Component {
    render() {
        return (
            <div className="Year">
                {
                    this.state.year.months.map((month) => {
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
