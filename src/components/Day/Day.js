import React, { Component } from 'react';

import Day from './components/Day/Day';

class Day extends Component {
    render() {
        return (
            <div className="Day">
                {
                    this.props.day
                }
            </div>
        )
    }
}

export default Day;
