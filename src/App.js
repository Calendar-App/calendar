import React, { Component } from 'react';
import './App.css'

import Year from './components/Year/Year';
import YearCreator from './year-creator';
import yearCreator from './year-creator';


class App extends Component {
  constructor() {
    super()
    this.state = {
      years: [
        {
          months: []
        }
      ]

    }

    this.nextYear = this.nextYear.bind(this);
    this.pervYear = this.pervYear.bind(this);
    this.showMore = this.showMore.bind(this);
    this.selectWeek = this.selectWeek.bind(this);
  }

  componentDidMount() {
    let years = [new YearCreator(2018)]
    this.setState({
      years
    })
  }

  nextYear() {
    this.setState({
      years: [new YearCreator(++this.state.years[0].year)]
    })
  }
  pervYear() {
    this.setState({
      years: [new YearCreator(--this.state.years[0].year)]
    })
  }

  showMore() {
    let years = this.state.years
    years.push(new YearCreator(++this.state.years[0].year))
    this.setState({
      years
    })
    console.log(this.state)
  }

  selectWeek() {
    // this.state.years.months = this.months.map(month => {
    //     month.days = month.days.map(day => {
    //         if (day.week === week) day.owner = user
    //         return day
    //     })
    //     return month
    // })
  }

  render() {
    return (
      <div className="App">
        <div className='calendar-header'>
          <div id='next-year' onClick={() => this.nextYear()}>
            <i class="fa fa-arrow-left" aria-hidden="true"></i>
          </div>
          <div id='current-year'>{this.state.years[0].year}</div>
          <div id='prev-year' onClick={() => this.pervYear()}>
            <i class="fa fa-arrow-right" aria-hidden="true"></i>
          </div>
        </div>
        {this.state.years.map(year => <Year key={year} year={year} />)}
        <div className='show-more' onClick={() => this.showMore()}>Show More?</div>
      </div>
    );
  }
}

export default App;
