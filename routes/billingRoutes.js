//create a function that takes an app instance and 
//use it to create appropriate handlers.
//Immediately Export it and in the file that you need access to these routes
//require this file by calling it by passing the express app instance
module.exports = app => {
    app.post('api/stripe', (req, res) => {

    });
}