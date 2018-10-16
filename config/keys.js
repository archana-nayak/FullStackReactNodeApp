//keys.js --- figure out what set of credentials to return
//commit this for version control

if (process.env.NODE_ENV === 'production') {
  //we are in production --- return the production set of keys
  module.exports = require('./prod');
} else {
  //we are in development --- return the development set of keys
  //what we do is require the dev.js file and then immediately use
  //what is imported to assign to module.exports.
  module.exports = require('./dev');
}