import React, { Component } from 'react';

import Day from '../Day/Day';

class Month extends Component {
    render() {
        return (
            <div className="Month">
                {
                    this.props.month.days.map((day) => {
                        return (
                            <Day day={day} />
                        )
                    })
                }
            </div>
        )
    }
}

export default Month;
