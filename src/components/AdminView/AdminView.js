// - Admin — User List Component
//     - select and update maintenance weeks
//     - same as select week on user side
//     - view all different colored weeks
//         - view client’s name, weeks and color 
//         - click to expand for more information
//     - view maintenance weeks on bottom of side modal
//     - cancel week / delete user 

import React, { Component } from 'react';
import './AdminView.css';

import axios from 'axios';

import Year from '../Year/Year';
import YearCreator from '../../year-creator';
import { CirclePicker } from 'react-color';


class AdminView extends Component {
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
        id: 0,
        name: '',
        weeks: [],
        maxweeks: null
      }],
      color: '#f44336',
      modal: false,
      modalFunction: () => { },
      deselecting: false,
      selectedWeek: -1,
      selectedWeeks: [],
      weekArray: [],
      hoveredWeek: null
    }
  }


  componentDidMount() {
// CREATING NEW YEAR
    let year = new YearCreator(2018);
    this.setState({
      year
    })

// GETTING ALL USERS FROM DATABASE
    axios.get(`/api/users`).then(response => {
      let users = response.data;
      let year = this.state.year;

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
      }, () => console.log(this.state.users))
    })
  }

changeYear(num) {
  let year = new YearCreator(this.state.year.year + num)
  let { users } = this.state

  for(let i=0; i < 12; i++) {
    let month = year.months[i]
    for(let j=0; j < month.days.length; j++) {
      let day = month.days[j]
      day.owner = users.find( user => user.weeks.includes(day.week))
    }
  }

  this.setState({
    year
  })
}

toggleModal = (cb, bool) => {
  this.setState({
    modal: !this.state.modal,
    modalFunction: cb.bind(this),
    deselecting: bool
  })
}

modalFunction = (bool, week, weekArray) => {
  let { selectedWeeks } = this.state

  selectedWeeks.includes(week) ? selectedWeeks.splice(selectedWeeks.indexOf(week), 1) : selectedWeeks.push(week);
  
  this.setState({
    selectedWeek: -1,
    selectedWeeks
  })
}

selectWeek(week) {
  let weekArray = this.state.year.months.reduce((arr, month) => {
    month.days.map( day => {
      if (day.week === week) arr.push(day)
    })
    return arr;
  }, [])

  let bool = this.state.selectedWeeks.includes(week)
  this.setState({
    selectedWeek: week,
    weekArray
  })

  this.toggleModal( () => this.modalFunction(bool, week, weekArray), bool)
}

hoverWeek = hoveredWeek => {
  this.setState({
    hoveredWeek
  })
}

removeUser(id) {
  axios.delete(`api/deleteuser/${id}`)
       .then( res => {
        axios.get(`/api/users`).then(response => {
          let users = response.data;
          let year = this.state.year;
    
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
          }, () => console.log(this.state.users))
        })
       })
}

removeWeek(id, week) {
  axios.delete(`api/removeweek/${id}/${week}`)
       .then( res=> {
        axios.get(`/api/users`).then(response => {
          let users = response.data;
          let year = this.state.year;
    
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
          }, () => console.log(this.state.users))
        })
       })
}

  render() {

    let user = this.state.users.map( (user, i) => {
      return <div key={i} className='userList'>
          <div>{user.name}</div>
          <div>{user.weeks.map( (week, i) => {
            return <div key={i}>
            <div>{week}</div>
            <button onClick={ () => this.removeWeek(user.id, week) }>X</button>
            </div>
          })}</div> 
          <button onClick={ () => this.removeUser(user.id) }>Remove User</button>
      </div>
    })

    return (
      <div className='AdminView'>

        {/* HEADER */}

        <div className='calendar-header'>
          <div id='prev-year' onClick={() => this.changeYear(-1)}>
            <i className="fa fa-arrow-left" aria-hidden="true"></i>
          </div>

          <div id='current-year'>{this.state.year.year}</div>

          <div id='next-year' onClick={() => this.changeYear(1)}>
            <i className="fa fa-arrow-right" aria-hidden="true"></i>
          </div>
        </div>

        {/* CALENDAR */}

        <div className='calendar-and-modal'>
          <div className='admin-side-modal'>
            <div className='side-header'>

            </div>

            <div className='admin-side-control'>
              {user}
            </div>
          </div>

          <div className='admin-calendar'>
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
        </div>

      </div>
    )
  }
}

export default AdminView;