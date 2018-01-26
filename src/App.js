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
      color: 'grey',
      modal: false,
      modalFunction: () => { },
      selectedWeek: -1
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

  hoverWeek = week => {
    if (this.week === week) return // if we hover over another day in the same week
    else this.week = week
    let year = this.state.year
    year.months = year.months.map(month => {
      month.days = month.days.map(day => {
        if (day.week === week) day.hover = true
        else day.hover = false
        return day
      })
      return month
    })
    this.setState({
      year
    })
  }

  toggleModal = f => {
    console.log(f)
    this.setState({
      modal: !this.state.modal,
      modalFunction: f.bind(this)
    })
  }

  selectWeek = week => {

    let weekArray = this.state.year.months.reduce((arr, month) => {
      month.days.map(day => {
        if (day.week === week) arr.push(day)
      })
      return arr
    }, [])

    this.setState({
      selectedWeek: week,
      weekArray
    })
    this.toggleModal(() => {
      console.log(week)
      console.log(weekArray)
      let year = this.state.year
      year.months = year.months.map(month => {
        month.days = month.days.map(day => {
          if (day.week === week) day.owner = this.state.user.id
          return day
        })
        return month
      })
      this.setState({
        year
      })
    })
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
          color={this.state.color}
        />
        {
          this.state.modal ?
            <div id="shadow" onClick={() => this.toggleModal(() => { })} >
              <div id="modal" >
                <div id="modal-header">Select Week {this.state.selectedWeek}?</div>
                <div id="modal-subheader">{`${this.state.year.months[this.state.weekArray[0].month].fullMonth} ${this.state.weekArray[0].date} - ${this.state.year.months[this.state.weekArray[6].month].fullMonth} ${this.state.weekArray[6].date} (${this.state.year.year})`}</div>
                <button onClick={() => this.toggleModal(() => { })} >Cancel</button>
                <button onClick={() => this.state.modalFunction()} >Select</button>
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
