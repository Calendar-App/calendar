import React, { Component } from 'react';
import './App.css'

import axios from 'axios';

import Year from './components/Year/Year';
import YearCreator from './year-creator';
import { CirclePicker } from 'react-color';

// App contains all of the data and functions for the calendar
class App extends Component {
  constructor() {
    super()
    this.state = {
      year: {
        months: []
      },
      // current user object - to be received from the rest of the site or from the server
      currentUser: {
        id: 123
      },
      // all of the users - to be received from the rest of the site or from the server
      users: [{
        id: 0,
        weeks: [] // weeks of the year owned by that user
      }],
      // selected color to display on the screen
      color: '#f44336',
      // whether or not the modal should display
      modal: false,
      // the function that will be called when the primary button inside the modal is clicked
      modalFunction: () => { },
      // whether or not the selected week should be deselected or selected when the modal function fires
      deselecting: false,
      // the week that has been clicked on most recently - also the week that will be either selected or deselected in the modal
      selectedWeek: -1,
      // array of all the weeks that have been selected by the user - these have only been selected in the front end and not yet saved in the database
      selectedWeeks: [],
      // an array of all the days in the 'selectedWeek' - it may be best to remove this property later to increase readability
      weekArray: [],
      // the week that is currently being hovered over by the mouse
      hoveredWeek: null
    }
  }


  componentDidMount = () => {
    // creating a new year - defaulting to 2018 - see 'year-creator.js' for the class YearCreator
    let year = new YearCreator(2018)
    this.setState({
      year
    })
    // axios.get(`/auth/me`).then(response => {
    //   this.setState({
    //     currentUser: response.data
    //   })
    // })
    // getting all users from the database and saving them to state
    axios.get(`/api/users`).then(response => {
      let users = response.data
      let year = this.state.year
      // mapping through the year > months > days to add an owner to days that already belong to someone
      for (let i = 0; i < 12; i++) {
        let month = year.months[i]
        for (let j = 0; j < month.days.length; j++) {
          let day = month.days[j]
          day.owner = users.find(user => user.weeks.includes(day.week))
        }
      }
      this.setState({
        users,
        year
      })
    })
  }


  // fired when the arrows (top right & left corners) are clicked on to change the displayed year
  changeYear = num => {
    // num is either +1 or -1, to increment or decrement the year
    console.log(this.state.year.year + num)
    // create a new year
    let year = new YearCreator(this.state.year.year + num)
    let { users } = this.state
    // add users to each day - see componentDidMount()
    for (let i = 0; i < 12; i++) {
      let month = year.months[i]
      for (let j = 0; j < month.days.length; j++) {
        let day = month.days[j]
        day.owner = users.find(user => user.weeks.includes(day.week))
      }
    }
    console.log(year)
    this.setState({
      year
    })
  }


  // fired when on the mouseOver of each day
  hoverWeek = hoveredWeek => {
    this.setState({
      hoveredWeek
    })
  }


  // fired in the selectWeek function below - may need to consolidate these functions for better readability
  // takes in a callback and a boolean
  toggleModal = (cb, bool) => {
    // the callback function is fired inside the modal when the primary button is clicked
    console.log(cb)
    // the boolean references whether we are selecting or deselecting a week (whether or not it is already selected)
    console.log(bool)
    console.log(this.state)
    this.setState({
      modal: !this.state.modal,
      modalFunction: cb.bind(this),
      deselecting: bool
    })
  }


  // this is the actual function that is passed into the toggleModal function above by the selectWeek function below - may also consolidate this for better readability
  modalFunction = (bool, week, weekArray) => {
    // the boolean references whether we are selecting or deselecting a week (whether or not it is already selected)
    console.log(bool)
    // week is the number of the week that was clicked on
    console.log(week)
    // weekArray is an array of all the days inside the selected week - see initial state
    console.log(weekArray)
    let { selectedWeeks } = this.state
    // if the week is already selected, then we will remove the week from the selectedWeeks array
    if (selectedWeeks.includes(week)) {
      selectedWeeks.splice(selectedWeeks.indexOf(week), 1)
    }
    // if the week is not already selected, then we will add it to the selectedWeeks arary
    else {
      selectedWeeks.push(week)
    }
    this.setState({
      selectedWeek: -1,
      selectedWeeks
    })
  }


  // this is the function that is actually fired when a day/week is clicked on - this function passes the 'modalFunction' above into the 'toggleModal' function above it
  // takes in the number of the week that was clicked on
  selectWeek = week => {
    // weekArray is an array of all the days inside the selected week - this is used so that we can display the beginning and ending dates of the selected week inside the modal
    let weekArray = this.state.year.months.reduce((arr, month) => {
      month.days.map(day => {
        if (day.week === week) arr.push(day)
      })
      return arr
    }, [])
    // the boolean references whether or not the 
    let bool = this.state.selectedWeeks.includes(week)
    this.setState({
      selectedWeek: week,
      weekArray
    })
    // toggleModal will display the modal and give it the function that should be fired when the modal's primary button is clicked
    this.toggleModal(() => this.modalFunction(bool, week, weekArray), bool)
  }


  // fires when the user selects a different color
  handleColorChange = (color, event) => {
    // color.hex is created by the CirclePicker library
    this.setState({
      color: color.hex
    })
  }


  // this function will be fired when the user checks out
  // this function will take the selected weeks array from state and save it to the database and then redirect to a new page
  save = () => {
    axios.post(`/api/...`)
  }


  render() {
    console.log(this.state)
    return (
      <div className="App">

        {/* HEADER */}

        <div className='calendar-header'>
          {/* PREVIOUS YEAR BUTTON */}
          <div id='prev-year' onClick={() => this.changeYear(-1)}>
            <i className="fa fa-arrow-left" aria-hidden="true"></i>
          </div>
          {/* CURRENT YEAR */}
          <div id='current-year'>{this.state.year.year}</div>
          {/* NEXT YEAR BUTTON */}
          <div id='next-year' onClick={() => this.changeYear(1)}>
            <i className="fa fa-arrow-right" aria-hidden="true"></i>
          </div>
        </div>

        {/* COLOR PICKER */}

        <CirclePicker
          onChangeComplete={this.handleColorChange}
          colors={
            ["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5",
              "#2196f3", "#03a9f4", "#00bcd4", "#009688", "#4caf50",
              "#8bc34a", "#cddc39", "#ffeb3b", "#ffc107", "#ff9800",
              "#cc7000", "#795548", "#607d8b"]
          }
          circleSize={28} // size of circles
          circleSpacing={14} // space between circles
        />

        {/* YEAR */}

        <Year
          key={this.state.year.year}
          year={this.state.year}
          selectWeek={this.selectWeek}
          selectedWeek={this.state.selectedWeek}
          selectedWeeks={this.state.selectedWeeks}
          hoverWeek={this.hoverWeek}
          hoveredWeek={this.state.hoveredWeek}
          color={this.state.color}
          currentUser={this.state.currentUser}
        />

        {/* MODAL */}

        {
          this.state.modal ?
            // SHADOW - to cover background - onClick turns modal off
            <div id="shadow" onClick={() => this.toggleModal(() => { })} >
              {/* MODAL */}
              <div id="modal" onClick={e => e.stopPropagation()} >
                {/* HEADER */}
                <div id="modal-header">{this.state.deselecting ? "Deselect" : "Select"} Week {this.state.selectedWeek}?</div>
                {/* SUBHEADER */}
                <div id="modal-subheader">{`${this.state.year.months[this.state.weekArray[0].month].fullMonth} ${this.state.weekArray[0].date} - ${this.state.year.months[this.state.weekArray[6].month].fullMonth} ${this.state.weekArray[6].date} (${this.state.year.year})`}</div>
                {/* BUTTONS */}
                <div id='button-container'>
                  {/* CANCEL BUTTON */}
                  <button id='cancel' onClick={() => this.toggleModal(() => { })} >Cancel</button>
                  {/* PRIMARY BUTTON */}
                  <button id='select' onClick={() => { this.state.modalFunction(); this.toggleModal(() => { }) }} >{this.state.deselecting ? "Deselect" : "Select"}</button>
                </div>
              </div>
            </div>
            :
            null
        }
      </div>
    );
  }
}

export default App;
