const express = require('express')
const app = express()
require('dotenv').config()
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient
app.use(bodyParser.urlencoded({ extended: true }))

const dataRouter = require("./Routes/routes")
app.use(dataRouter)

// const url = "mongodb://localhost:27017/"
// const dbName = "my_event"
// let db
const localUrl = process.env.LOCALURL
const dbName = process.env.DBNAME
const url = localUrl+dbName

var db = require('./db/dbConnect')
const router = require('./Routes/routes')
require("./config/config")

db.Init(url).then(() => {
  console.log("Succesfully connected to MongoDB")

  app.post("/quotes", dataRouter)
})


app.listen(process.env.PORT, function() {
    console.log(`listening on ${process.env.PORT}`)
    console.log(config.db.connectionString);
    // console.log(db)
  })

  
// app.get(endpoint, callback)
app.get('/', (req, res) => {
    console.log(req.body)
    // console.log(__dirname)
    // Note: __dirname is the current directory you're in.
    // res.send(req.body)
    res.sendFile(__dirname + '/index.html')
    // res.send('Hello World')

    // do something here
    // console.log('tadaaam');
    

})

// app.post('/quotes', db.Submit)
//  => {
    // console.log(req.body)
    // res.send(req.body)
    // MongoClient.connect(url, (err, client) => {
        // ... do something here
            // db = client.db(dbName)
            // console.log(db.Users)
            // db.collection('Users').insertOne(req.body)
            // let tmp = db.collection("Users").find()
            // console.log(tmp)
        
        // console.log('Connected MongoDB')
      // })
  // })

// nodemon
// Nodemon restarts the server automatically when you save a file that’s used by the server.js. 
// We can install Nodemon with the following command:
//
// $ npm install nodemon
//
// Add this line at package.json in "script":{ (here) } "dev": "nodemon server.js"
// to active nodemon, cli command: npm run dev

// body-parser
// Body-parser is a middleware. They help to tidy up the request object before we use them. 
// Express lets us use middleware with the use method.
//
// The urlencoded method within body-parser tells body-parser to extract data from the <form> 
// element and add them to the body property in the request object.
//
// You should be able to see values from the <form> element inside req.body now. 
// Try doing a console.log and see what it is!
//
// app.post('/route', (req, res) => {
//  console.log(req.body)
// })
//
// You should see an object similar to the following:
// {
//  name: 'Jean',
//  quote: 'Train yoursel to let go of everything you fear to lose'
// }

// mongodb
//
// Once installed, we can connect to MongoDB through the MongoClient’s connect method as shown in the code below:
//
// const MongoClient = require('mongodb').MongoClient
//
// MongoClient.connect('mongodb-connection-string', (err, client) => {
//     // ... do something here
// })

// mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false