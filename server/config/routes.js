// server/config/routes.js
// This is the file that specifies which routes will be handled and by which controller methods.
// From routes.js we require the controller file (or files).

var userController = require('./../controllers/users.js');
var productController = require('./../controllers/products.js');

const mongoose = require('mongoose');
const controller = require('./../controllers/controller.js');
module.exports = app => {
	app.get('/api/all_polls', pollController.all_polls);
    app.post('/api/create_poll', pollController.create_poll);
    app.get('/api/get_poll/:id', pollController.get_poll);


    app.all("*", (req,res,next) => {
        res.sendfile(path.resolve("./client/dist/index.html"))
        //should this really be index.html???????
    });
  
}
