import React, { Component } from 'react';
import './Checkout.css';

class Checkout extends Component {
    constructor(props) {
        super(props)

        this.state = {
            total: 0.00,
            weeks: []
        }
    }


    componentWillReceiveProps(newProps) {
        console.log('newProps', newProps)
        console.log('test', this.state.weeks)
        console.log('is equal', this.findEqual(newProps.app.weekArray, this.state.weeks.length === 0 ? this.state.weeks : this.state.weeks[this.state.weeks.length - 1]))

        // checks if the current selected week is the same as the last week in states weeks array. if they are different then push the new week from props.
        if (this.findEqual(newProps.app.weekArray, this.state.weeks.length === 0 ? this.state.weeks : this.state.weeks[this.state.weeks.length - 1])) {
            null
        }
        else if (newProps.app.cancel){
            this.state.weeks.push(newProps.app.weekArray)
        }


            

        this.setState({
            selectedWeeks: newProps.app.selectedWeeks
        })

    }

    // total copy paste to compare two arrays haha
    // checks to compare if two arrays are equal.
    findEqual = (value, other) => {
        var isEqual = function (value, other) {

            // Get the value type
            var type = Object.prototype.toString.call(value);

            // If the two objects are not the same type, return false
            if (type !== Object.prototype.toString.call(other)) return false;

            // If items are not an object or array, return false
            if (['[object Array]', '[object Object]'].indexOf(type) < 0) return false;

            // Compare the length of the length of the two items
            var valueLen = type === '[object Array]' ? value.length : Object.keys(value).length;
            var otherLen = type === '[object Array]' ? other.length : Object.keys(other).length;
            if (valueLen !== otherLen) return false;

            // Compare two items
            var compare = function (item1, item2) {

                // Get the object type
                var itemType = Object.prototype.toString.call(item1);

                // If an object or array, compare recursively
                if (['[object Array]', '[object Object]'].indexOf(itemType) >= 0) {
                    if (!isEqual(item1, item2)) return false;
                }

                // Otherwise, do a simple comparison
                else {

                    // If the two items are not the same type, return false
                    if (itemType !== Object.prototype.toString.call(item2)) return false;

                    // Else if it's a function, convert to a string and compare
                    // Otherwise, just compare
                    if (itemType === '[object Function]') {
                        if (item1.toString() !== item2.toString()) return false;
                    } else {
                        if (item1 !== item2) return false;
                    }

                }
            };

            // Compare properties
            if (type === '[object Array]') {
                for (var i = 0; i < valueLen; i++) {
                    if (compare(value[i], other[i]) === false) return false;
                }
            } else {
                for (var key in value) {
                    if (value.hasOwnProperty(key)) {
                        if (compare(value[key], other[key]) === false) return false;
                    }
                }
            }

            // If nothing failed, return true
            return true;

        };

        return isEqual(value, other)
    }


    handleClick = (week) => {
        console.log(this.props.selectWeek)

    }

    render() {
        console.log('mah state', this.state)
        return (
            <div className='checkout-container'>
                <div className='checkout-tile'>
                    <h3 id='checkout-header'>Checkout <i className="fa fa-shopping-cart"></i></h3>
                    <span id='checkout-subheader'>Select Weeks, Fill Your Cart</span>
                    {this.props.selectedWeeks
                        ? this.props.app.selectedWeeks.map((week, index) => (
                            <div>
                                <span>Week {week}</span>
                            </div>
                        ))
                        : null
                    }
                    {this.state.weeks.length
                        ? this.state.weeks.map((week, i) => (
                            week.map(day => (
                                day.holiday
                                    ? <div>{day.holiday}</div>
                                    : null
                            ))
                        ))
                        : null

                    }
                    {this.state.weeks.length
                        ? this.state.weeks.map((week, i) => (
                            <div onClick={() => this.handleClick(week)}>
                                {`${this.props.app.year.months[this.state.weeks[i][0].month].fullMonth} ${this.state.weeks[i][0].date} - ${this.props.app.year.months[this.state.weeks[i][6].month].fullMonth} ${this.state.weeks[i][6].date} (${this.props.app.year.year})`}
                            </div>
                            // <div>Hello</div>
                        ))
                        : null

                    }
                    <span id='total'>Total ${this.props.app.selectedWeeks.length * 150.00}</span>
                </div>
            </div>
        )
    }
}

export default Checkout;