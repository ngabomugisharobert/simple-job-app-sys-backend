const mongoose = require('mongoose')


const db = () => {
    const uri = 'mongodb://ROBERT:4vsXbxMq3hAJ5SeE@cluster0-shard-00-00.ft8t1.mongodb.net:27017,cluster0-shard-00-01.ft8t1.mongodb.net:27017,cluster0-shard-00-02.ft8t1.mongodb.net:27017/?ssl=true&replicaSet=atlas-371tyh-shard-0&authSource=admin&retryWrites=true&w=majority'
    // const uri = 'mongodb+srv://odilo:SlWTQjLaUejf4oLV@cluster0.k95fy.mongodb.net/ejo?authSource=admin&replicaSet=atlas-b64l4n-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true'
    // const uri = "mongodb+srv://ROBERT:Kingrobert@250@cluster0.ft8t1.mongodb.net/?retryWrites=true&w=majority";
    try {
        //  { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
        mongoose.connect(uri, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
        console.log('Connection to DB Successful');
        require('../apps/auth/model');
        require('../apps/application/model')
    } catch (err) {
        console.log('Connection to DB Failed', err);
    }
};

//export db
module.exports = db;
