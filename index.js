const express = require('express');
require('./services/passport');

const app = express();

require('./routes/authRoutes') (app);

//process.env.PORT for production where HEROKU will
//set the underlying environment variable.
// For development, we define the port at which our
//server will run on.
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
