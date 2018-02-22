import React, { Component } from 'react';
import './Checkout.css';

class Checkout extends Component {
    constructor(props) {
        super(props)

        this.state = {
            total: 0.00,
            checkoutWeeks: []
        }
    }

    // I used componentWillRecieveProps so that each time state changes I can get the updated state.
    componentWillReceiveProps(newProps) {
        //fires addNewWeek function
        this.addNewWeek(newProps.app.weekArray, newProps.app.addToCheckout)
        // fires removeWeek function
        this.removeWeek(newProps.app.removeWeek)

        this.setState({
            selectedWeeks: newProps.app.selectedWeeks
        })
    }

    // recieves the weeks number then checks if that week is in the weeks array, if so, remove it.
    removeWeek = (weekNumber) => {
        //because the default value of weekNumber is null we need to check if it has been changed to a number
        if (weekNumber > 0 || weekNumber === 0) {
            for (let i = 0; i < this.state.checkoutWeeks.length; i++) {
                if (this.state.checkoutWeeks[i][0].week === weekNumber) {
                    this.state.checkoutWeeks.splice(i, 1)
                }
            }
        }
        this.props.app.removeWeek = null
    }

    // adds the selected week to checkout if it is not found in this.state.checkoutWeeks array
    addNewWeek = (weekArray, addToCheckout) => {
        let addToArr = true
        for (let i = 0; i < this.state.checkoutWeeks.length; i++) {
            if (this.findEqual(weekArray, this.state.checkoutWeeks[i])) {
                addToArr = false
            }
        }
        if (addToArr) {
            return addToCheckout
                ? this.state.checkoutWeeks.push(weekArray)
                : null
        }
    }

    // checks to compare if two arrays are equal. (found online)
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


    toggleModalFromCheckout = (week) => {
        this.props.selectWeek(week[0].week)
    }



    render() {
        return (
            <div className='checkout-container'>
                <div className='checkout-tile'>
                    <h3 id='checkout-header'>Checkout <i className="fa fa-shopping-cart"></i></h3>
                    <span id='checkout-subheader'>Select Weeks, Fill Your Cart</span>
                    {this.state.checkoutWeeks.length
                        ? this.state.checkoutWeeks.map((week, i) => (
                            <div onClick={() => this.toggleModalFromCheckout(week)}>
                                {`${this.props.app.year.months[this.state.checkoutWeeks[i][0].month].fullMonth} ${this.state.checkoutWeeks[i][0].date} - ${this.props.app.year.months[this.state.checkoutWeeks[i][6].month].fullMonth} ${this.state.checkoutWeeks[i][6].date} (${this.props.app.year.year})`}

                                {week.map(day => (
                                    day.holiday
                                        ? <div >{day.holiday}</div>
                                        : null
                                ))}
                            </div>
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