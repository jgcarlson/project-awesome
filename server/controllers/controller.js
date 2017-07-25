var mongoose = require('mongoose');
var User = mongoose.model('User');
var Product = mongoose.model('Product');
//var Review = mongoose.model('Review');
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


module.exports = {
	//**********************************
	//product controller methods \/
	//**********************************
	todays_deals: function(req, res){ //fetch 3 random products
		Product.find({}).limit(3).exec( (err, products)=>{
			if(err){
	    		console.log(err);
				let errors = [];
		        for(let i in err.errors){
		          errors.push(err.errors[i].message);
	        	}
	        	return res.status(400).send(errors);
	    	}
	    	return res.json(products);
		})
		
	},
	shop_by_category: function(req, res){
		
	},
	featured_items: function(req, res){
		
	},
	featured_vendors: function(req, res){
		
	},
	recent_reviews: function(req, res){
		
	},
	recently_viewed: function(req, res){
		
	},
	suggested_products: function(req, res){
		
	},
	get_user: function(req, res){
		
	},
	get_vendor: function(req, res){
		
	},
	get_item: function(req, res){
		
	},
	find_item: function(req, res){
		var search = req.params.search_criteria.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
		search = search.replace(/\s{2,}/g," ");
		search = search.toLowerCase();
		var criteria = search.split(" ");
		Product.find({ tags: { "$in" : criteria} }, (err, products)=>{
			if(err){
	    		console.log(err);
				let errors = [];
		        for(let i in err.errors){
		          errors.push(err.errors[i].message);
	        	}
	        	return res.status(400).send(errors);
	    	}
	    	for (var i = 0; i<products.length; i++){
  				products[i].matches = 0;
  				for (var w = 0; w<criteria.length; w++){ //loop through all criteria
    				if (products[i].tags.indexOf(criteria[w])> -1){ //if word is in tags
      					products[i].matches += 1; //increment matches
    				}
  				} //done with words
			} //done with products
	    	products.sort(function(a, b) {
    			return b.matches - a.matches;
			});
			return res.json(products);
		});

		
	},
	new_items_from_store: function(req, res){
		Product.find({_vendor: req.params.id}).sort('-createdAt').limit(3).exec( (err, products)=>{
			
		})
		
	},
	popular_items_from_store: function(req, res){
		
	},
	create_item: function(req, res){
		
	},
	
}