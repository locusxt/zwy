// Schema、Model、Entity或者Documents的关系请牢记，Schema生成Model，Model创造Entity，Model和Entity都可对数据库操作造成影响，但Model比Entity更具操作性。
const mongoose = require('mongoose');
// 连接数据库 如果不自己创建 默认test数据库会自动生成
mongoose.connect('mongodb://localhost/test');

// 为这次连接绑定事件
const db = mongoose.connection;
db.once('error',() => console.log('Mongo connection error'));
db.once('open',() => console.log('Mongo connection successed'));
/************** 定义模式loginSchema **************/
const loginSchema = mongoose.Schema({
    account : String,
    password : String
});

const cmSchema = mongoose.Schema({
    name: String,
    version: String,
    leader: String,
    desc: String,
    date: Date,
    configs: [{name: String, range:String}]
});

const amSchema = mongoose.Schema({
    name: String,
    version: String,
    leader: String,
    desc: String,
    date: Date,
    configs: [{name: String, range:String}],
    cms:[{id:String, name:String, weight:Number}],
    subconfigs:[{name:String, range:String, value:String}]
});

const runtimeSchema = mongoose.Schema({
    name: String,
    desc: String,
    cpu: String,
    nodenum: Number
});

const datasetSchema = mongoose.Schema({
    name: String,
    desc: String,
    datasets: [{name:String, version:String, desc:String, gen:String}]
});

const cmTestSchema = mongoose.Schema({
    cm:{name:String, id:String},
    runtime:{name:String, id:String},
    problem:{name:String, id:String},
    dataset:{name:String, id:String},
    configs:{},
    tests:[{time:String, leader:String, result:Number, remark:String}]
});

const amTestSchema = mongoose.Schema({
    // am:{name:{type:String}, id:{type:String}},
    am:{name:String, id:String},
    runtime:{name:String, id:String},
    problem:{name:String, id:String},
    dataset:{name:String, id:String},
    configs:{},
    subconfigs:{},
    tests:[{
        time:String, leader:String, result:Number, remark:String,
        cms:[{
            id:String, name:String, weight:Number, result:Number
        }]
    }]
}, { strict: true });

/************** 定义模型Model **************/
const Models = {
    Login : mongoose.model('Login',loginSchema),
    CM : mongoose.model('CM', cmSchema),
    AM : mongoose.model('AM', amSchema),
    Runtime : mongoose.model('Runtime', runtimeSchema),
    Dataset : mongoose.model('Dataset', datasetSchema),
    CMTest: mongoose.model('CMTest', cmTestSchema),
    AMTest: mongoose.model('AMTest', amTestSchema),
}

module.exports = Models;