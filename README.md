# ION Portal

This portal is a single page application, built to display following technical capabilities:

1. Angular : Framework used to build the application.
2. ngrx : For state management.
3. Angular material : For building UI.
2. JavaScript (ES6)
3. CSS3
4. HTML
5. ExpressJS: NodeJS Server to mock a prod server. 

It currently has 3 views - welcome, login and dashboard. Dashboard is a private view visible to logged in users only.

## Pre requisites
1. Node.js version 8.x or 10.x.
2. npm client & npm package manager.
3. Angular CLI. To install `npm install -g @angular/cli`.
4. Run `npm install` to install all the required dependencies.


## Web Server

Use web server to run the application, since it also starts the server having the required Api's.

Run `npm start` to build and deploy on the server. Also it will start the server. Navigate to `http://localhost:3000`.

Currently the app has only two dummy users:
1. USERNAME: user1
   PASSWORD: pass1
2. USERNAME: user2
   PASSWORD: pass2

## Development server

Use devlopment server for front-end development. It starts a mock server and serves the application.

Note: For mocking API, you need may additional tools like postman etc.

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
