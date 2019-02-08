# 523-Project

Security N Complaince 

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Executables you will need to build/run this project:

* [NodeJS](https://nodejs.org/en/download/)
* [MongoDB Community Version](https://www.mongodb.com/download-center/community)

You should be able to call ```mongod``` in your terminal now, if it says its not a path variable, you will need to add it to your path variables

Once you have installed both open your terminal and verify npm is a path variable by running:

```
npm -v
```

If you get an error message, you will need to add npm to your path variables

Next, install AngularCLI using npm

```
npm install -g @angular/cli
```

Angular should now be path variable, if it is not, add it to your path variables

Finally git clone this repository

### Installing

To be able to run both the frontend and backend you will need to run ```npm install``` in both of the folders using your terminal

## Running the project
You will need to open three terminal windows:
In the first terminal window execute ```mongod``` to start a local MongoDB Server, wait until it says its listening for a connection

In the second terminal window navigate to the backend folder and execute ```node index.js```, if there are errors they are probably with packages so troubleshoot to get those resolved

In the third terminal window navigate the the frontend folder and run ```ng serve``` and wait for it to build, any errors will be with the packackages

## Before you start developing, a few things to note

1. You will need to register an account for your local MongoDB server, you will only need to do this once. Using Postman or any other REST Testing client you will need to POST to http://localhost:3000/login with the following body:
   usernameRegister: <your testing username>
   usernamepassword: <your testing password>
   passwordConf: <same as your testing password>
  
This is the only time you will have to register

2. Most internet browsers will not save JWT tokens from a localhost, this means that even if the frontend works and accepts all it is supposed to, chrome wont save the token which you need to complete other calls. The work around for this is by opening your developer console in your browser (I've only tested for chrome so far) to http://localhost:3000/ as a web address and make this call obviously with just your username and password and no <>: 

```
fetch('http://localhost:3000/login', {
  method: 'POST',
  body: JSON.stringify({
   username: '<your_username>',
   password: '<your_password>',
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8'
  }
})
.then(res => res.json())
.then(console.log)
```
   
