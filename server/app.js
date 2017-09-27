var express = require('express');
var models = require('./db');
var app = express();
var router = express.Router();
var bodyParser = require("body-parser");  

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/api/', (req, res)=> {
  res.send('Hello World!');
});

router.post('/api/createCM', (req, res)=>{
  console.log(req.body);
  let newCM = new models.CM(req.body);
  newCM.save((err, data)=>{
    if (err) {
        res.send(err);
    } else {
        res.send('create CM successed');
    }
  });
  // res.send("success");
})

router.get('/api/test1', (req, res)=>{
  let CM = models.CM;
  CM.find().exec().then(data=>{
    console.log(data);
    res.send(data);
  });
  // res.send("success");
  // let newAccount = new models.Login({
  //   account: "hihihi",
  //   password: "ihihihi"
  // });
  // newAccount.save((err, data)=>{
  //   if (err) {
  //       res.send(err);
  //   } else {
  //       res.send('createAccount successed');
  //   }
  // });
});

// router.get('/api/test1', (req, res)=>{
//   let newAccount = new models.Login({
//     account: "hihihi",
//     password: "ihihihi"
//   });
//   newAccount.save((err, data)=>{
//     if (err) {
//         res.send(err);
//     } else {
//         res.send('createAccount successed');
//     }
//   });
// });

app.use(router);

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});