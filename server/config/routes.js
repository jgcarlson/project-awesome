// server/config/routes.js
// This is the file that specifies which routes will be handled and by which controller methods.
// From routes.js we require the controller file (or files).

const mongoose = require('mongoose');
const controller = require('./../controllers/controller.js');
module.exports = app => {
  //**********************************
  //product routes \/
  //**********************************
  app.get('/api/todays_deals', controller.todays_deals);
  app.get('/api/shop_by_category', controller.shop_by_category);
  app.get('/api/featured_items', controller.featured_items);
  app.get('/api/featured_vendors', controller.featured_vendors);
  app.get('/api/recent_reviews', controller.recent_reviews);
  app.get('/api/recently_viewed/:id', controller.recently_viewed);
  app.get('/api/order_history/:id', controller.order_history);
  app.get('/api/suggested_products/:id', controller.suggested_products);
  app.get('/api/get_item/:product_id/:user_id', controller.get_item);
  app.get('/api/get_item_nolog/:product_id/', controller.get_item_nolog);
  app.get('/api/find_item/:search_criteria', controller.find_item);
  app.get('/api/new_items_from_store/:id', controller.new_items_from_store);
  app.get('/api/my_items/:id', controller.my_items);
  app.get('/api/popular_items_from_store/:id', controller.popular_items_from_store);
  app.post('/api/create_item', controller.create_item);
  app.post('/api/payment', controller.payment);
  //**********************************
  //user routes \/
  //**********************************
  app.post('/api/register_user', controller.register_user);
  app.post('/api/authenticate', controller.authenticate);
  app.get('/api/get_user/:id', controller.get_user);
  app.get('/api/get_vendor/:id', controller.get_vendor);
  app.get('/api/get_basket/:id', controller.get_basket);
  app.post('/api/basket', controller.add_to_basket);
  app.post('/api/remove_from_basket', controller.remove_from_basket);
  app.post('/api/process_order', controller.process_order);

  //**********************************
  //review routes \/
  //**********************************
  app.post('/api/review_vendor', controller.review_vendor);
  app.post('/api/review_product', controller.review_product);
  app.get('/api/get_reviews/:id', controller.get_reviews);

}
