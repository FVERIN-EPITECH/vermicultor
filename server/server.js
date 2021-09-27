const express = require('express')
var cors = require('cors')
const app = express()
require('dotenv').config()
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());

const dataRouter = require("./Routes/routes")
// app.use(dataRouter)

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

      for (let index = 0; index < 4; index++) {
        await data.insertOne(req.body);
        
      }
      // const result = await data.insertOne(req.body);
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
     data.find({ started_at : { $lt:Date('2019-09-18T21:07:42.313+00:00')}}).limit(5).toArray(function(err, result) {
       if (err) throw err;
      res.send(result)
    
      
     });
   } finally {
     await client.close
   }
     // console.log(myCursor)
  
})

function dataToSend(){

  let array = [];
  let i=0;
  for (let index = 0; index < 400; index++) {
      currentDateTime = new Date();
      currentDateTime.setDate(currentDateTime.getDate()-index);
      let number;
      if (index == 0){
          hours = currentDateTime.getHours();
      }
      else{
          currentDateTime.setHours(24);
          currentDateTime.setMinutes(0);
          hours = 24;
      }

      for (let x = 0; x < hours; x++) {
          // let object = {};
          // object.temperature = Math.random() * (100 -30) - 20;
          // object.humidity = Math.random() * 100;
          // object.currentDateTime = new Date(currentDateTime.setHours(currentDateTime.getHours()-1));
          // array.push(object);
          if(x == 0 && index == 0)
          {
              minutes = currentDateTime.getMinutes();
              minutes = minutes%10;
          }
          else{
              minutes = 6;
          }

          for(let y = 0; y < minutes; y++){
              if(index == 0 && x == 0){
                  let object = {};
                  object.temperature = Math.random() * (100 -30) - 20;
                  object.humidity = Math.random() * 100;
                  object.currentDateTime = new Date(currentDateTime.setMinutes(currentDateTime.getMinutes()-10));
                  array.push(object);
              }
              else{
                  let object = {};
                  object.temperature = Math.random() * (100 -30) - 20;
                  object.humidity = Math.random() * 100;
                  object.currentDateTime = new Date(currentDateTime.setMinutes(currentDateTime.getMinutes()-10));
                  array.push(object);
              }

          }
      }
      
  }
  console.log(array);
  return array;
}

  app.post("/addData2", async (req, res) => {
    // async function run() {
       try {
         await client.connect();
         const database = client.db("my_event");
         const data = database.collection("data");
         // create a document to insert
         
         await data.insertMany(dataToSend());
           
         // const result = await data.insertOne(req.body);
         res.send(dataToSend());
         console.log(dataToSend())
         console.log(req.headers)
        //  console.log(`A document was inserted with the _id: ${result.insertedId}`);
       } finally {
           await client.close();
       }
   })

app.get("/getData3", async (req, res) => {
  try {
      await client.connect();
      const database = client.db("my_event");
      const data = database.collection("data");
      let currentDate = new Date();
      let i = currentDate.getDay();
      if(i === 0){
        currentDate.setHours(0);
        currentDate.setMinutes(0);
        i+=7;
        currentDate.setDate(currentDate.getDate() - i);
      }
      else{
        currentDate.setDate(currentDate.getDate() - i);
      }
      
      // console.log(currentDate);
      data.find({ currentDateTime : { $gt:currentDate}}).toArray(function(err, results) {
        if (err) throw err;
        // console.log(results);
      let dayOne = [];
      let arrayTemperature = [];
      let arrayHumidity = [];
      let arrayDay = [];
      // let tmpInd = 0;
      // let tmpT=0;
      // let tmpH=0;
      for (let z = 0; z < i; z++) {
        let tmpInd = 0;
        let tmpT=0;
        let tmpH=0;
        let day;

        
        // console.log(z);
        // console.log(new Date().getDate() - z);
        results.map(result => {
          if (result.currentDateTime.getDate() == new Date().getDate() - z){
          //  ? dayOne.push(result) : false;
          // console.log(result.currentDateTime.getDate());
          // console.log(z);
          tmpInd += 1;
          tmpT += parseInt(result.temperature);
          tmpH += parseInt(result.humidity);
          var options = { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' };
          day = new Intl.DateTimeFormat('fr', options).format(result.currentDateTime);
          }
        // console.log(tmpT);
        // console.log(tmpH);
      })
      arrayDay.push(day);
      arrayTemperature.push(tmpT/tmpInd);
      arrayHumidity.push(tmpH/tmpInd);
      // console.log('Température moyenne :'+tmpT/tmpInd);
      // console.log('Taux d\'humidité moyenne :'+tmpH/tmpInd);
        
      }

      // console.log(arrayTemperature, arrayHumidity, arrayDay);
      
          // console.log(result.currentDateTime.getDate())
        //   tmpInd += 1;
        //   dayOne.push(result);
          // console.log(result);
        
      
      // console.log(dayOne);
      res.send({temperature:arrayTemperature.reverse(), humidity:arrayHumidity.reverse(), labels:arrayDay.reverse()});
    
      
     });
   } finally {
     await client.close
   }
     // console.log(myCursor)
  
})

app.get("/getData4", async (req, res) => {
  try {
      await client.connect();
      const database = client.db("my_event");
      const data = database.collection("data");
      let currentDate = new Date();
      console.log('mois :'+currentDate.getMonth(), "\njour :"+currentDate.getDate())
      currentDate.setDate(1);
      currentDate.setHours(2);
      currentDate.setMinutes(0);
      console.log(currentDate.getDate());
      console.log(currentDate);
      data.find({currentDateTime : {$gt : currentDate}}).toArray(function(err, results) {
        if (err) throw err;

      let arrayTemperature = [];
      let arrayHumidity = [];
      let arrayDay = [];

      for (let index = 0; index < new Date().getDate(); index++) {

        let tmpInd = 0;
        let tmpT=0;
        let tmpH=0;
        let day;

        results.map(result => {
          if (result.currentDateTime.getDate() == new Date().getDate() - index) {
            tmpInd += 1;
            tmpT += parseInt(result.temperature);
            tmpH += parseInt(result.humidity);
            day = `${result.currentDateTime.getDate() < 10 ? '0' + result.currentDateTime.getDate() : result.currentDateTime.getDate()}/${result.currentDateTime.getMonth() < 10 ? '0' + result.currentDateTime.getMonth() : result.currentDateTime.getMonth()}/${result.currentDateTime.getFullYear()}`;
          }
        })

        arrayDay.push(day);
        arrayTemperature.push(tmpT/tmpInd);
        arrayHumidity.push(tmpH/tmpInd);
        console.log('Température moyenne :'+tmpT/tmpInd);
        console.log('Taux d\'humidité moyenne :'+tmpH/tmpInd);
            
      }

      console.log(arrayTemperature, arrayHumidity, arrayDay);
      res.send({temperature:arrayTemperature.reverse(), humidity:arrayHumidity.reverse(), labels:arrayDay.reverse()});
      })
  } finally {
     await client.close
    }
})

app.get("/getOneDay", async (req, res)=>{
  try {
    // await client.connect();
    // const database = client.db("my_event");
    // const data = database.collection("data");
    console.log(req.query.date);
    res.send(req.body)
} finally {
  //  await client.close
  }
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