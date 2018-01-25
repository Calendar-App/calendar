import React, { Component } from 'react';

class Day extends Component {
    render() {
        return (
            <div className="Day">
                {
                    this.props.day.date
                }
                {
                    this.props.day.fullDay
                }
            </div>
        )
    }
}

export default Day;
