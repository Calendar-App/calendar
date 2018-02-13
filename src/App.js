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
      user: {
        id: 123
      },
      users: [{
        id: 0
      }],
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
    axios.get(`/api/users`).then(response => {
      let users = response.data
      let year = this.state.year
      year.months = year.months.map(month => {
        month.days = month.days.map(day => {
          day.owner = users.filter(user => user.weeks.includes(day.week))[0]
          return day
        })
        return month
      })
      console.log(year.weeks)
      this.setState({
        users,
        year
      })
    })
  }

  nextYear = () => {
    let year = new YearCreator(++this.state.year.year)
    let users = this.state.users
    year.months = year.months.map(month => {
      month.days = month.days.map(day => {
        day.owner = users.filter(user => user.weeks.includes(day.week))[0]
        return day
      })
      return month
    })
    this.setState({
      year
    })
  }

  prevYear = () => {
    let year = new YearCreator(--this.state.year.year)
    let users = this.state.users
    year.months = year.months.map(month => {
      month.days = month.days.map(day => {
        day.owner = users.filter(user => user.weeks.includes(day.week))[0]
        return day
      })
      return month
    })
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

    let year = Object.assign({}, this.state.year)
    year.months = year.months.map(month => {
      month.days = month.days.map(day => {
        if (day.week === week) day.selected = bool // true/false
        return day
      })
      return month
    })

    this.setState({
      year,
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

    this.toggleModal(() => this.modalFunction(bool, week, weekArray), bool)

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
          <div id='prev-year' onClick={() => this.prevYear()}>
            <i className="fa fa-arrow-left" aria-hidden="true"></i>
          </div>
          <div id='current-year'>{this.state.year.year}</div>
          <div id='next-year' onClick={() => this.nextYear()}>
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
          hoverWeek={this.hoverWeek}
          hoveredWeek={this.state.hoveredWeek}
          color={this.state.color}
          user={this.state.user}
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
