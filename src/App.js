import React, { Component } from 'react';
import './App.css'

import Year from './components/Year/Year';
import YearCreator from './year-creator';

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
      }

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
        {
          this.state.years.map(year => (
            <Year key={year} year={year} selectWeek={this.selectWeek} />
          ))
        }
      </div>
    );
  }
}

export default App;
