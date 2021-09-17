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
console.log(url)
require("./config/config")

const client = new MongoClient(process.env.LOCALURL)

app.listen(process.env.PORT, function() {
  console.log(`listening on ${process.env.PORT}`)
})

app.post("/addData", async (req, res) => {
 // async function run() {
    try {
      await client.connect();
      const database = client.db("my_event");
      const data = database.collection("data");
      // create a document to insert

      req.body.currentDateTime = new Date;

      const result = await data.insertOne(req.body);
      res.send(req.body)
      console.log(req.headers)
      console.log(`A document was inserted with the _id: ${result.insertedId}`);
    } finally {
        await client.close();
    }
})

app.get("/getData", async (req, res) => {
   try {
      await client.connect();
      const database = client.db("my_event");
      const data = database.collection("data");
      data.find({}).toArray(function(err, result) {
        if (err) throw err;
       res.send(result)
     
       
      });
    } finally {
      await client.close
    }
      // console.log(myCursor)
   
})

app.get("/getData2", async (req, res) => {
  try {
     await client.connect();
     const database = client.db("my_event");
     const data = database.collection("sample_citibike");
     data.find({ started_at : { $gt:Date('2019-09-18T21:07:42.313+00:00')}}).limit(5).toArray(function(err, result) {
       if (err) throw err;
      res.send(result)
    
      
     });
   } finally {
     await client.close
   }
     // console.log(myCursor)
  
})
  // db.collection('data', (err, collection) => {
    
  //   app.get("/getData", (req, res) => {
  //     collection.find().toArray((err, datas) => {
  //       if(!err) res.send(datas)
  //     });
  //   })

    // app.post("/addData", (req, res) => {
    //   req.body.dateTime = new Date;
    //   collection.insert(req.body, (err, datas) => {
    //     if(!err) res.send(datas)
    //   });
    // })




// app.get(endpoint, callback)
app.get('/', (req, res) => {
      // do something here
    console.log(req.body)
    // console.log(__dirname)
    // Note: __dirname is the current directory you're in.
    res.sendFile(__dirname + '/index.html')
    // res.send('Hello World')
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