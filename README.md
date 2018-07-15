
# Calendar App

<br>

We built this calendar app for a startup in Arizona. The company deals with timeshares to a property and needed a way for customers to select weeks of the year. 

<br>

Live at >>> [https://calendar.thomaslowry.me/](https://calendar.thomaslowry.me/)

<br>

## Technologies

 - React
 - Vanilla JavaScript

<br>

## Year-Creator Class

In order to display an entire year, We built a JavaScript class that takes in a year and returns an object with all the months and days of that year, including US national holidays.

### Year

The `Year` class takes in a year (or defaults to the current year), and instantiates the `Month` class for each month in that year.

### Month

The `Month` class takes in a `Date` object that contains both the month and the year that it belongs to. This class instantiates the `Day` class for each day in that month.

### Day

The `Day` class take in a `Date` object that contains the year, month, and date of the day. It runs the date through the `holiday` function that compares the month, date, and day of the week to see if the day is a US federal holiday.

<br>

## Weeks

The selection of weeks presented a challenge because a week can contain days from multiple months and even multiple years. With many weeks containing days from two months, we needed some way of allowing each day to know when another day in the same week is hovered over or clicked on, in order to style them correctly.

### Tracking the Weeks

To solve this problem, we added a week property to each day, when the year is constructed. That way each day knows which week it belongs to. Then we used `mouseenter` and `mouseleave` events to track which week is hovered over, and `click` events to track which one has been clicked on. This way, even days that are contained within different month components can know if their week is being hovered over or not.

### Prototypes and Performance

Since all of state has to be tracked in `App.js`, this causes React to rerender the entire year whenever the mouse moves over a different week.

We initially had arrow functions inside of our JSX in multiple components. This is not much of an issue in `App.js` or even `Year.js` or `Month.js` because there is only one `App`, one `Year`, and twelve `Month`s. However, in `Day.js`, this presented a huge issue because there were two arrow functions inside the JSX of the functional `Day` component, meaning that each time the user hovers over a different day, the app rerenders, and 700+ arrow functions are recreated and saved in memory, making the hover effect extremely slow.

This was the first time that we learned that class components in React are not only used for tracking state, but also for saving memory and time by using prototypes.

We converted the Day component into a stateless class component with methods that will fire on mouseover and mouseleave to tell the app which week is being hovered. Now instead of recreating 700+ functions every time the mouse moves, there are two functions saved on the prototype of the `Day` class that are accessed by each instance of the class. Now the hover effect is fairly quick.

### A Better Way - Refs, Context or Redux

If we were to recreate this project, we would recognize the issue of weeks, and would probably use React refs to directly access each day of the week that is hovered, instead of resetting the state of the entire application just for a hover effect. Another way would be to use context or redux so that only the months and days that are hovered over will rerender.

<br>

## Screenshots

<img src="https://github.com/Calendar-App/calendar/blob/master/screenshots/Calendar%20Screenshot.PNG?raw=true">
