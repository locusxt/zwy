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

router.post('/api/createruntime', (req, res)=>{
  console.log(req.body);
  let newRuntime = new models.Runtime(req.body);
  newRuntime.save((err, data)=>{
    if (err) {
        res.send(err);
    } else {
        res.send('create Runtime successed');
    }
  });
  // res.send("success");
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
});

router.post('/api/createAM', (req, res)=>{
  console.log(req.body);
  let newAM = new models.AM(req.body);
  newAM.save((err, data)=>{
    if (err) {
        res.send(err);
    } else {
        res.send('create AM successed');
    }
  });
});

router.post('/api/createdataset', (req, res)=>{
  console.log(req.body);
  let newDataset = new models.Dataset(req.body);
  newDataset.save((err, data)=>{
    if (err) {
        res.send(err);
    } else {
        res.send('create dataset successed');
    }
  });
});

router.post('/api/addcmtest', (req, res)=>{
  console.log(req.body);
  let CMTest = models.CMTest;
  CMTest.update(req.body.info, {$addToSet:{"tests":req.body.newtest}}, {upsert:true}, (err, docs)=>{
    if(err) {
      console.log(err);
      res.send(err);
    }
    else 
      res.send('create CMTest successed');
  });
});

router.post('/api/getcmtest', (req, res)=>{
  console.log(req.body);
  let CMTest = models.CMTest;
  CMTest.findOne(req.body).exec().then(data=>{
    // console.log(data);
    console.log('cmtest:');
    console.log(data);
    res.send(data.tests);
  });
});


router.post('/api/addamtest', (req, res)=>{
  console.log(req.body);
  let AMTest = models.AMTest;
  AMTest.update(req.body.info, {$addToSet:{"tests":req.body.newtest}}, {upsert:true}, (err, docs)=>{
    if(err) {
      console.log(err);
      res.send(err);
    }
    else 
      res.send('create AMTest successed');
  });
});

router.post('/api/getamtest', (req, res)=>{
  console.log(req.body);
  let AMTest = models.AMTest;
  // AMTest.findOne(req.body).exec().then(data=>{
  //   // console.log(data);
  //   console.log('amtest:');
  //   console.log(data);
  //   if(data.tests != undefined)
  //     res.send(data.tests);
  //   else
  //     res.send([]);
  // });
  AMTest.findOne(req.body, function(err, doc){
    if(err){
      console.log("error");
      console.log(err);
      res.send([]);
    }
    else{
      if (doc == null)
        res.send([]);
      else
        res.send(doc.tests);
    }
  });
});

router.post('/api/createcmtest', (req, res)=>{
  console.log(req.body);
  let newCMTest = new models.CMTest(req.body);
  newCMTest.save((err, data)=>{
    if (err) {
        res.send(err);
    } else {
        res.send('create CMTest successed');
    }
  });
});


router.get('/api/test1', (req, res)=>{
  let newRuntime = new models.Runtime({
      name: "天河",
      desc: "china",
      cpu: "i7",
      nodenum: 100000
  });
  newRuntime.save((err, data)=>{
    if (err) {
        res.send(err);
    } else {
        res.send('create Rt successed');
    }
  });
});

router.get('/api/getcm', (req, res)=>{
  let CM = models.CM;
  CM.find().exec().then(data=>{
    console.log(data);
    res.send(data);
  });
});

router.get('/api/getam', (req, res)=>{
  let AM = models.AM;
  AM.find().exec().then(data=>{
    console.log(data);
    res.send(data);
  });
});

router.get('/api/getdataset', (req, res)=>{
  let Dataset = models.Dataset;
  Dataset.find().exec().then(data=>{
    console.log(data);
    res.send(data);
  });
});

router.get('/api/getruntime', (req, res)=>{
  let Runtime = models.Runtime;
  Runtime.find().exec().then(data=>{
    console.log(data);
    res.send(data);
  });
});

router.get('/api/getdataset', (req, res)=>{
  let Dataset = models.Dataset;
  Dataset.find().exec().then(data=>{
    console.log(data);
    res.send(data);
  });
});

// router.get('/api/getcmtest', (req, res)=>{
//   let CMTest = models.CMTest;
//   CMTest.find().exec().then(data=>{
//     console.log(data);
//     res.send(data);
//   });
// });

app.use(router);

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});