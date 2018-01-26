import React, { Component } from 'react';
import './App.css'

import Year from './components/Year/Year';
import YearCreator from './year-creator';
import { CirclePicker } from 'react-color';


class App extends Component {
  constructor() {
    super()
    this.state = {
      years: [
        {
          months: []
        }
      ],
      user: {
        id: 123
      },
      color: 'grey'

    }
  }

  componentDidMount = () => {
    let years = [new YearCreator(2018)]
    this.setState({
      years
    })
  }

  nextYear = () => {
    this.setState({
      years: [new YearCreator(++this.state.years[0].year)]
    })
  }
  pervYear = () => {
    this.setState({
      years: [new YearCreator(--this.state.years[0].year)]
    })
  }

  // showMore() {
  //   let years = this.state.years
  //   years.push(new YearCreator(++this.state.years[0].year))
  //   this.setState({
  //     years
  //   })
  //   console.log(this.state)
  // }

  selectWeek = week => {
    let year = this.state.years[0]
    year.months = year.months.map(month => {
      month.days = month.days.map(day => {
        if (day.week === week) day.owner = this.state.user.id
        return day
      })
      return month
    })
    this.setState({ years: [year] })
  }

  handleColorChange = (color, event) => {
    this.setState({ color: color.hex });
    console.log(this.state.color)
    
  };

  render() {
    return (
      <div className="App">
        <div className='calendar-header'>
          <div id='prev-year' onClick={() => this.pervYear()}>
            <i class="fa fa-arrow-left" aria-hidden="true"></i>
          </div>
          <div id='current-year'>{this.state.years[0].year}</div>
          <div id='next-year' onClick={() => this.nextYear()}>
            <i class="fa fa-arrow-right" aria-hidden="true"></i>
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
        />;
        {
          this.state.years.map(year => (
            <Year key={year} year={year} selectWeek={this.selectWeek} color={this.state.color}/>
          ))
        }
      </div>
    );
  }
}

export default App;
