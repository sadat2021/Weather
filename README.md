# Getting Started with Weather Widget

This project developed by React.js and Typescript for reading the end user’s current location using navigator.geolocation, and retrieves the current weather conditions for that location using the Open Weather Map API.

## Used programming languages & libraries

- Hooks has been used in order to functional component programming.
- Typescript has been used for adding type checking to Javascript.
- Axios for calling api.
- `navigator.geolocation` for reading the end user’s current location.
- SASS for styling.
- `Jest` have been used for implenting the tests.

## Available Scripts

In the project directory, you can run:

### `npm run start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run build`

Builds the app for production to the `build` folder.

### `npm run test`

Runs all tests and display the tests' result.

## Setup/installation instructions

- `npm install` should be run before running the project.

## Assupmtions

- Assumped that GPS is on on your device.
- Assumped that your device provided access to GPS.
- Assumped that by loading the page automathically your location will be detected and the api will be called and `city name`, `Temperature`, `Wind Speed` and `image` will be displayed. You can change `Temperature` from centigrade into fahrenheit and vice versa. Also you can turn displaying `Wind` on the card on and off.
- I added `units=imperial` into the end of the api call in order to retrieves the temperature in fahrenheit.
- The webpage is mobile-responsive.
