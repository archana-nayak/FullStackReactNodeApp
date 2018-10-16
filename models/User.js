const mongoose = require('mongoose');
const { Schema } = mongoose; //get the Schema property from mongoose object
//object destructuring

const userSchema = new Schema({
  googleId: String
});

mongoose.model('users', userSchema);//tells mongoose to create
//the Model class for the users collection using the userSchema