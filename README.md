# Shopify Production Engineer Intern Challenge / Shopify Backend Developer Intern Challenge - Summer 2022

TASK: Build an inventory tracking web application for a logistics company.

Extra feature chosen: Push a button export product data to a CSV

# How to Run:

**Dependencies Required**
1) Node.js/npm (install at https://nodejs.org/en/download/)
2) MongoDB (install at https://www.mongodb.com/try/download/community)

**Steps to Run**
1) Have three different terminals open to run the frontend, backend, and MongoDB

2) Run the command: 'npm install' in both the frontend/ and backend/ directories.

3) On one terminal, start in the root directory of the repository. Make a new directory called mongodb with 'mkdir mongodb'

If the mongo commands are added to the path (go [here](https://dangphongvanthanh.wordpress.com/2017/06/12/add-mongos-bin-folder-to-the-path-environment-variable/) to see how to add to PATH on Windows, and [here](https://stackoverflow.com/questions/24306398/how-to-add-mongo-commands-to-path-on-mac-osx) on MacOS), follow this guide for starting the database:

**Windows:** mongod --dbpath .\mongodb\
**MacOS/Linux:** mongod --dbpath ./mongodb

If they are not in your PATH or there was trouble adding to the PATH, you can directly use the command as follows (assuming it is installed in the C drive on Windows):

**Windows:** C:"Program Files"\MongoDB\Server\4.4\bin\mongod.exe --dbpath .\mongodb\
**MacOS/Linux:** {MONGO_INSTALL_LOCATION}/Server/{VERSION_NUMBER}/bin/mongod --dbpath ./mongodb

4) On another terminal, enter the backend directory and run the command: node index

5) On another terminal, enter the frontend directory and run the command: npm start

6) After completing all of the above steps the web-app should load in a browser and allow you to preform CRUD operations along with export data to a CSV once entries have been added. Can also be accessed on the browser at: http://localhost:3000

## Built By

- **[Aleks Jugovic](https://github.com/Aleksjug)**

## Built With

- **[React.js](https://reactjs.org/)**
- **[Node.js](https://nodejs.org/)**
- **[Express](https://expressjs.com/)**
- **[MongoDB](https://www.mongodb.com/)**