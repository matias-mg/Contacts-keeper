const mongoose = require('mongoose');
const config = require('config');
const db = config.get('MongoURI');

const connectDB = () => {
  mongoose.connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  }).then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.log(err); 
  })
};

module.exports = connectDB;