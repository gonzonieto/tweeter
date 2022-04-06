# Tweeter Project

Tweeter is a simple, single-page Twitter clone.

## Objectives

- use jQuery to manipulate DOM elements
- implement CSS transitions and animations, both with raw CSS and with jQuery
- sanitize user input to protect against cross-site scripting
- implement error handling and user warnings

## Setup

To set up Tweeter, follow these instructions:

- have [`npm`](https://www.npmjs.com/) installed
- clone this repo to your machine
- install dependencies with `npm install`
- run the server with `npm run local`
- once the server is running, you can visit your Tweeter instance at `http://localhost:8080/`

## Dependencies

- [Express](https://www.npmjs.com/package/express/)
- [Node.js](https://nodejs.org/en/) 5.10.x or above
- [body-parser](https://www.npmjs.com/package/body-parser/)
- [Chance](https://www.npmjs.com/package/chance)
- [MD5](https://www.npmjs.com/package/md5)

## Responsive Design
### Desktop 
![](docs/tweeter-desktop-view.png)

### Tablet
![](docs/tweeter-tablet-vertical-view.png)

### Mobile
![](docs/tweeter-mobile-view.png)

## Animations
### Colour animation on button `:hover`
![](docs/tweeter-button-colour-animation.gif)

### Box shadow animation on `:hover`
![](docs/tweeter-box-shadow-animation.gif)

### Error messages for bad input
![](docs/tweeter-error-animation.gif)