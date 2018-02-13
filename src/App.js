import React, { Component } from 'react';
import './App.css'

import axios from 'axios';

import Year from './components/Year/Year';
import YearCreator from './year-creator';
import { CirclePicker } from 'react-color';


class App extends Component {
  constructor() {
    super()
    this.state = {
      year: {
        months: []
      },
      currentUser: {
        id: 123
      },
      users: [{
        id: 0
      }],
      // unavailableDays: [],
      color: '#f44336',
      modal: false,
      modalFunction: () => { },
      deselecting: false,
      selectedWeek: -1,
      selectedWeeks: [],
      weekArray: [],
      hoveredWeek: null,
      lastHoveredWeek: null
    }
  }

  componentDidMount = () => {
    let year = new YearCreator(2018)
    this.setState({
      year
    })
    // axios.get(`/auth/me`).then(response => {
    //   this.setState({
    //     currentUser: response.data
    //   })
    // })
    axios.get(`/api/users`).then(response => {
      let users = response.data
      let year = this.state.year
      // let unavailableDays = []
      for (let i = 0; i < 12; i++) {
        let month = year.months[i]
        for (let j = 0; j < month.days.length; j++) {
          let day = month.days[j]
          day.owner = users.find(user => user.weeks.includes(day.week))
          // if (!unavailableDays.includes(day.week) && day.owner) {
          //   unavailableDays.push(day.week)
          // }
        }
      }
      this.setState({
        users,
        // unavailableDays,
        year
      })
    })
  }

  changeYear = num => {
    console.log(this.state.year.year + num)
    let year = new YearCreator(this.state.year.year + num)
    let { users } = this.state
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

  hoverWeek = hoveredWeek => {
    if (this.state.modal) return
    if (this.state.hoveredWeek === hoveredWeek) return
    else {
      let lastHoveredWeek = this.state.hoveredWeek
      this.setState({
        lastHoveredWeek,
        hoveredWeek
      })
    }
  }

  toggleModal = (cb, bool) => {
    console.log(bool)
    console.log(cb)
    console.log(this.state)
    this.setState({
      modal: !this.state.modal,
      modalFunction: cb.bind(this),
      deselecting: !bool
    })
  }

  modalFunction = (bool, week, weekArray) => {
    console.log(bool)
    console.log(week)
    console.log(weekArray)
    let { selectedWeeks } = this.state
    if (selectedWeeks.includes(week)) {
      selectedWeeks.splice(selectedWeeks.indexOf(week), 1)
    }
    else {
      selectedWeeks.push(week)
    }
    this.setState({
      selectedWeeks
    })
  }

  selectWeek = week => {
    let weekArray = this.state.year.months.reduce((arr, month) => {
      month.days.map(day => {
        if (day.week === week) arr.push(day)
      })
      return arr
    }, [])
    let bool = !this.state.selectedWeeks.includes(week)
    this.setState({
      selectedWeek: week,
      weekArray
    })
<<<<<<< HEAD
    

  //need to update so we can de-select week
    this.toggleModal(() => {
      console.log(week)
      console.log(weekArray)
      let year = this.state.year
      year.months = year.months.map(month => {
        month.days = month.days.map(day => {
          if (day.week === week) day.selected = true  //will need to change to false
          return day
        })
        return month
      })
      this.setState({
        year
      })
    })

=======
    this.toggleModal(() => this.modalFunction(bool, week, weekArray), bool)
>>>>>>> master
    this.hoverWeek(week)
  }

  handleColorChange = (color, event) => {
    this.setState({
      color: color.hex
    })
  }

  save = () => {
    axios.post(`/api/...`)
  }

  render() {
    return (
      <div className="App">
        <div className='calendar-header'>
          <div id='prev-year' onClick={() => this.changeYear(-1)}>
            <i className="fa fa-arrow-left" aria-hidden="true"></i>
          </div>
          <div id='current-year'>{this.state.year.year}</div>
          <div id='next-year' onClick={() => this.changeYear(1)}>
            <i className="fa fa-arrow-right" aria-hidden="true"></i>
          </div>
        </div>
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
        <Year
          key={this.state.year.year}
          year={this.state.year}
          selectWeek={this.selectWeek}
          selectedWeeks={this.state.selectedWeeks}
          hoverWeek={this.hoverWeek}
          hoveredWeek={this.state.hoveredWeek}
          color={this.state.color}
          currentUser={this.state.currentUser}
        />
        {
          this.state.modal ?
            <div id="shadow" onClick={() => this.toggleModal(() => { })} >
              <div id="modal" onClick={e => e.stopPropagation()} >
                <div id="modal-header">{this.state.deselecting ? "Deselect" : "Select"} Week {this.state.selectedWeek}?</div>
                <div id="modal-subheader">{`${this.state.year.months[this.state.weekArray[0].month].fullMonth} ${this.state.weekArray[0].date} - ${this.state.year.months[this.state.weekArray[6].month].fullMonth} ${this.state.weekArray[6].date} (${this.state.year.year})`}</div>
                <div id='button-container'>
                  <button id='cancel' onClick={() => this.toggleModal(() => { })} >Cancel</button>
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
