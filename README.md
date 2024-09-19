# React Game Release Calendar

Welcome to the React Game Release Calendar! This application provides a user-friendly interface to track game releases in a monthly calendar format. It is built with React and utilizes the `date-fns` library for date operations.

## Features

- Interactive monthly view of game releases.
- Navigation between months.
- Clickable days to reveal game release details.
- Responsive design for various screen sizes.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before running the application, make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

### Installing

To get the project running, follow these steps:

1. Clone the repository to your local machine: `git clone https://github.com/<userName>/react-game-release-calendar.git`
2. Navigate to the project directory: `cd react-game-release-calendar`
3. Install the dependencies: `npm install`

### Running the Application

To start the application in development mode, run: `npm start`

This will start the local server and open the application in your default web browser. Typically, it will be available at [http://localhost:3000](http://localhost:3000).

### API Configuration

The application fetches data from an external API. Ensure that you have the correct API endpoint configured in your environment variables:

Create a `.env` file in the root of your project and add the following:

## Design Decisions

- **Date Management:** `date-fns` was chosen for its modular nature, allowing for tree shaking and keeping the bundle size small.
- **State Management:** Local component state is used instead of a state management library for simplicity, as the app's scale doesn't demand a more complex state management solution.
- **Styling:** CSS is written from scratch for learning purposes and to avoid the overhead of a styling framework.

## Trade-offs

- Due to time constraints, the application currently does not support localization and timezone adjustments. In the future, this could be implemented to enhance user experience.

- The calendar is not fully accessible. Future iterations would include better keyboard navigation and screen reader support.

## What I Would Do Differently

If given more time, I would:

- Implement comprehensive unit and integration tests.
- Add user authentication to allow personalized calendars.
- Create a more robust backend to support real-time updates and user interaction.

## Acknowledgments

- Thanks to [date-fns](https://date-fns.org/) for their excellent date utility library.
- Appreciation for the React community for continuous support and inspiration.
# Calendar
