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

router.post('/api/genreport', (req, res)=>{
  console.log('report');
  console.log(req.body);
  var ams = req.body.ams;
  var env = req.body.env;
  var configs = req.body.configs;
  var subconfigs = req.body.subconfigs;

  let AMTest = models.AMTest;
  let AM = models.AM;

  var amsGetnamePromise = ams.map(am=>{
    return new Promise(resolve=>{
      var query = {};
      query._id = am.amid;
      // console.log(query);
      AM.findOne(query, function(err, doc){
        var res = '';
        if (err)
          console.log('err');
        else{
          if(doc != null)
            res = doc.name;
        }
        resolve({
          amid:am.amid,
          name:res
        });
      });
    });
  });

  var amsPromise = ams.map(am=>{
    return new Promise(resolve=>{
      var query = env;
      query.amid = am.amid;
      AMTest.findOne(query, function(err, doc){
        var res = [];
        if(err){
          console.log("error");
        }
        else{
          if (doc != null)
            res = doc.tests;
        }
        resolve({
          amid:am.amid,
          loopnum:am.loopnum,
          tests:res
        });
      });
    });
  });
  var promises = amsGetnamePromise.concat(amsPromise);
  Promise.all(promises).then(result=>{
    console.log(result);
    var amReport = {};
    var cmReport = {};
    for (var i = 0; i < result.length / 2; ++i){
      var r1 = result[i];
      if (amReport[r1.amid] == undefined){
        amReport[r1.amid] = {};
        amReport[r1.amid].name = r1.name;
        amReport[r1.amid].loopnum = 0;
      }
      var r2 = result[i + result.length / 2];
      amReport[r2.amid].loopnum += r2.loopnum;
      if (amReport[r2.amid].tests == undefined)
        amReport[r2.amid].tests = r2.tests;
    }
    for (var k in amReport){
      var am = amReport[k];
      // console.log('---');
      // console.log(am.tests.length);
      var sumTime = 0;
      for (var i = 0; i < am.tests.length; ++i){
        var t = am.tests[i];
        sumTime += t.result;
        // console.log(t);
      }
      amReport[k].meanTime = sumTime / am.tests.length;
      amReport[k].totalTime = amReport[k].meanTime * amReport[k].loopnum;
    }

    for (var k in amReport){
      var am = amReport[k];
      var t0 = am.tests[0];
      console.log('===');
      console.log(t0);
      var cms = t0.cms;
      for (var i = 0; i < cms.length; ++i){
        var cm = cms[i];
        if (cmReport[cm.id] == undefined){
          cmReport[cm.id] = {
            name:cm.name,
            totalTime:0
          };
        }
        cmReport[cm.id].totalTime += am.totalTime * cm.weight;
      }
    }

    for (var k in amReport){
      var am = amReport[k];
      delete amReport[k].tests;
    }

    console.log(amReport);
    console.log(cmReport);
    res.send({
      amReport:amReport,
      cmReport:cmReport
    });

  });

})


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