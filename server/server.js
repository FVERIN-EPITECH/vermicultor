const express = require('express')
const app = express()
require('dotenv').config()
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient
app.use(bodyParser.urlencoded({ extended: true }))

const dataRouter = require("./Routes/routes")
app.use(dataRouter)

const localUrl = process.env.LOCALURL
const dbName = process.env.DBNAME
const url = localUrl+dbName

require("./config/config")




MongoClient.connect(url, (err, db) => {
  if(err) throw err;
  // console.log(db);
  // db = db.db(process.env.dbName)

  db.collection('data', (err, collection) => {
    
    app.get("/getData", (req, res) => {
      collection.find().toArray((err, datas) => {
        if(!err) res.send(datas)
      });
    })

    app.post("/addData", (req, res) => {
      req.body.dateTime = new Date;
      collection.insert(req.body, (err, datas) => {
        if(!err) res.send(datas)
      });
    })

    app.listen(process.env.PORT, function() {
      console.log(`listening on ${process.env.PORT}`)
  })

  })
})
// app.get(endpoint, callback)
app.get('/', (req, res) => {
      // do something here
    console.log(req.body)
    // console.log(__dirname)
    // Note: __dirname is the current directory you're in.
    res.sendFile(__dirname + '/index.html')
    // res.send('Hello World')
})

app.listen(process.env.PORT, function() {
  console.log(`listening on ${process.env.PORT}`)
})


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