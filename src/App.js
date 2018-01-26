import React, { Component } from 'react';
import './App.css'

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
      color: 'grey'
    }
  }

  componentDidMount = () => {
    let year = new YearCreator(2018)
    this.setState({
      year
    })
  }

  nextYear = () => {
    let year = new YearCreator(++this.state.year.year)
    this.setState({
      year
    })
  }

  prevYear = () => {
    let year = new YearCreator(--this.state.year.year)
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

  }

  selectWeek = week => {
    this.toggleModal(() => {
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
      </div>
    );
  }
}

export default App;
