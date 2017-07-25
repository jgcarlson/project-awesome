// server/config/routes.js
// This is the file that specifies which routes will be handled and by which controller methods.
// From routes.js we require the controller file (or files).

var userController = require('./../controllers/users.js');
var productController = require('./../controllers/products.js');

const mongoose = require('mongoose');
const controller = require('./../controllers/controller.js');
module.exports = app => {
	app.get('/api/todays_deals', productController.todays_deals);
	app.get('/api/shop_by_category', productController.shop_by_category);
	app.get('/api/featured_items', productController.featured_items);
	app.get('/api/featured_vendors', productController.featured_vendors);
	app.get('/api/recent_reviews', productController.recent_reviews);
	app.get('/api/recently_viewed', productController.recently_viewed);
	app.get('/api/suggested_products', productController.suggested_products);
    app.get('/api/get_user/:id', userController.get_user);
    app.get('/api/get_vendor/:id', userController.get_vendor);
    app.get('/api/get_item/:id', productController.get_item);
    app.get('/api/find_item/:search_criteria', productController.find_item);
    app.get('/api/new_items_from_store/:id', productController.new_items_from_store);
    app.get('/api/popular_items_from_store/:id', productController.popular_items_from_store);
    app.post('/api/create_item', productController.create_item);


    app.all("*", (req,res,next) => {
        res.sendfile(path.resolve("./public/dist/index.html"))
        //should this really be index.html???????
    });
  
}
