const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

require('./routes/authRoutes') (app);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});









//process.env.PORT for production where HEROKU will
//set the underlying environment variable.
// For development, we define the port at which our
//server will run on.