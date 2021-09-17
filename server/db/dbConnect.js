// const MongoClient = require('mongodb').MongoClient

// var _db= null
// module.exports = {
//     Init: (url) => {
//         return new Promise((resolve, reject) => {
//             if(!url)
//                 reject("You should provide a URL")
//             MongoClient.connect(url, function(err, db) {
//                 // ... do something here
//                 if(err)
//                     reject(err)
//                 _db = db;
//                 console.log(db);
//                 resolve(db);
//             })
//         })
//     },
//     Submit: (req, res, next) => {
//         console.log('\n\n\n\n'+db);
//         res.send('hello world')
//         // _db.collection('Users').insertOne(req.body)
//         // console.log(db.Users)
//         // res.send(req.body)
//     }
// }
