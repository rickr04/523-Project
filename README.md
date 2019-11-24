# Security-N-Compliance

Home of the SNC Backend API and SNC Angular Client

# Getting Started
Steps below to walk you through necessary downloads, installations, and setup

## Introduction
This project is divided into two parts: 
1. the [Node.js](https://nodejs.org/en/), [MongoDB](https://www.mongodb.com/download-center/community), and [Express](https://expressjs.com/) back-end 
2. the [Angular](https://angular.io/) front-end

The app is hosted on [Heroku](https://heroku.com) and can be viewed [Here](https://security-n-compliance.herokuapp.com)

## Downloads

### Git
First, register for a GitHub account if you haven't already. Git is a repository service that helps keep track of updates, issues, and project contributors. Install Git on your computer [Here](https://git-scm.com/downloads)

### Node.js and NPM
Node.js is a javascript runtime, which allows us to compile and run both the code and the dependencies. NPM (Node Package Manager) organizes our project packages (dependencies).

Install Node.js through the installation package [Here](https://nodejs.org/en/). Once installed, open the command prompt (Windows) or terminal (Mac OSX) to run
```
node -v
```
and
```
npm -v
```
to confirm that both NPM and Node.js were correctly installed and set as environmental variables on your system.

Then, use NPM to install Nodemon globally ```npm install -g nodemon```. Nodemon eases the development process by automatically refreshing your local Node server every time a change is saved.

### MongoDB
MongoDB is a NoSQL database system that stores entries as documents that are then organized in collections. MongoDB returns requests as JSON, making it easier to parse with Node.js and Angular.

To install MongoDB, follow the link [Here](https://www.mongodb.com/download-center/community). Once the installation is complete, return to your terminal and run ```mongod``` to start a database server locally. The data persists when the server is closed - don't worry about running and terminating the server often.

### Angular
Angular is the front-end framework used for this project. Unlike the Node.js back-end, Angular is programmed in TypeScript, which compiles down to JavaScript. TypeScript helps write neater code by keeping variables statically typed. To download Angular, go to your terminal and run
```
npm install -g @angular/cli
```
This will install the Angular client and create a new path variable. To confirm proper installation, run
```ng v```

## Getting The Project
After installing Node.js, MongoDB, and Angular, open the terminal window and clone this repository by running
```git clone https://github.com/MatthewFrisby/523-Project.git``` 

Change directories by running
```cd 523-Project```

Now you are in the project folder!

 few more installations are necessary before you can launch the development servers. In the 523-Project folder in your terminal, run ```npm i```. This will install all the required dependencies for the Node.js server. Next, change directories again by navigating to the SNC-FE folder and calling ```cd SNC-FE```. Rerun ```npm i``` to install the front-end dependencies. Now you are ready to launch the development servers!

To launch the servers, open three separate terminal windows. For two of the windows, I recommend using your file explorer to navigate to SNC-FE and back-end portions of the project. Right-click in each folder and select "Git Bash Here" to open the Git Bash window in that directory. The third terminal window can be opened anywhere.

Follow these commands IN ORDER:

1. In your third terminal window (the miscellaneous window), run the command ```mongod``` and wait until it reads "waiting for connection on port..."
2. If it is your first time deploying the application locally, you will need to seed your mongo database by running ```node "Script Stuff/script.js"```. This will seed your database with the SAQ questions and templates as well as make a superuser with the email as "admin" and password as "password"
3. Then, move to the terminal for the back-end and run ```nodemon server```. This will start your Node.js server.
4. The last step is to go to the SNC-FE terminal and run ```ng serve``` to start your Angular development server.

Once complete, open your browser and go to [http://localhost:4200](http://localhost:4200) to see Security-N-Compliance.

### Additional Notes
1. Your browser may try to open [http://localhost:3000](http://localhost:3000) with what looks like http://localhost:4200 but what you are actually seeing on http://localhost:3000 is the completely built application. Any changes made will not appear there. To update the built application, go to the SNC-FE folder in the terminal and run ```ng build --prod``` to update.

2. Because of Cross-Origin Resource Sharing (CORS) restrictions, you might have trouble logging into the angular application. To login you first need to attempt to do so with the login form. This will technically work but to recieve the cookie for further access you will need to open http://localhost:3000 in another window and then run this command in your developer console:
```
fetch('http://localhost:3000/api/login', {
  method: 'POST',
  body: JSON.stringify({
   email: 'admin',
   password: 'password' 
}),
  headers: {
    'Content-type': 'application/json; charset=UTF-8'
  }
})
.then(res => res.json())
.then(console.log)
```

## Editing
Suggested editor for working on this application is Atom. You can log in to Git through Atom and make all Git commands in the window, but feel free to use your editor of choice.

## Resources and Documentation
[Git](https://services.github.com/on-demand/downloads/github-git-cheat-sheet.pdf)

[Node.js](https://nodejs.org/en/docs/)

[NPM](https://docs.npmjs.com/)

[Express](https://expressjs.com/en/guide/routing.html)

[MongoDB](https://mongoosejs.com/docs/guide.html)

[Angular](https://angular.io/docs)

## Update 11/2019
Project is being taken over by Rick and Nathan
