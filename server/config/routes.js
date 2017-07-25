// server/config/routes.js
// This is the file that specifies which routes will be handled and by which controller methods.
// From routes.js we require the controller file (or files).


const mongoose = require('mongoose');
const controller = require('./../controllers/controller.js');
module.exports = app => {
  app.get('/api/todays_deals', controller.todays_deals);
  app.get('/api/shop_by_category', controller.shop_by_category);
  app.get('/api/featured_items', controller.featured_items);
  app.get('/api/featured_vendors', controller.featured_vendors);
  app.get('/api/recent_reviews', controller.recent_reviews);
  app.get('/api/recently_viewed', controller.recently_viewed);
  app.get('/api/suggested_products', controller.suggested_products);
  app.get('/api/get_user/:id', controller.get_user);
  app.get('/api/get_vendor/:id', controller.get_vendor);
  app.get('/api/get_item/:id', controller.get_item);
  app.get('/api/find_item/:search_criteria', controller.find_item);
  app.get('/api/new_items_from_store/:id', controller.new_items_from_store);
  app.get('/api/popular_items_from_store/:id', controller.popular_items_from_store);
  app.post('/api/create_item', controller.create_item);


    app.all("*", (req,res,next) => {
        res.sendfile(path.resolve("./public/dist/index.html"))
        //should this really be index.html???????
    });

}
