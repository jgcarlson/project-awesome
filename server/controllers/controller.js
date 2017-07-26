var mongoose = require('mongoose');
var User = mongoose.model('User');
var Product = mongoose.model('Product');
var Review = mongoose.model('Review');
var bcrypt = require('bcrypt');
const stripe = require('stripe')
const jwt = require('jsonwebtoken');
const cert = 'KEEP_IT_SECRET.KEEP_IT_SAFE.'
const keyPublishable = process.env.PUBLISHABLE_KEY;
const keySecret = process.env.SECRET_KEY;

module.exports = {
  //**********************************
  //product controller methods \/
  //**********************************
  todays_deals: function(req, res){ //fetch 3 random products
    Product.find({}, (err, products)=>{
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
    Product.find({'tags.2': {$exists: true}}).limit(1).exec( (err, product)=>{
      if(err){
          console.log(err);
        let errors = [];
            for(let i in err.errors){
              errors.push(err.errors[i].message);
            }
            return res.status(400).send(errors);
        }
        var taygs = [];
        //will this query return an array? or just one object.....
        //ignoring the possibility of an empty result bc we have a lot of fake data and im lazy
        taygs.push(product.tags[0]);
        taygs.push(product.tags[1]);
        taygs.push(product.tags[2]);
        return res.json(taygs);
    })

  },
  featured_items: function(req, res){
    Product.find({}, (err, products)=>{
      if(err){
          console.log(err);
        let errors = [];
            for(let i in err.errors){
              errors.push(err.errors[i].message);
            }
            return res.status(400).send(errors);
        }
        var prods = [];
        prods.push(products[Math.random()*products.length]);
        prods.push(products[Math.random()*products.length]);
        prods.push(products[Math.random()*products.length]);
        prods.push(products[Math.random()*products.length]);
        prods.push(products[Math.random()*products.length]);
        return res.json(prods);
    })

  },
  featured_vendors: function(req, res){
    User.find({vendor: true}).limit(3).exec( (err, vendors)=>{
      if(err){
          console.log(err);
        let errors = [];
            for(let i in err.errors){
              errors.push(err.errors[i].message);
            }
            return res.status(400).send(errors);
        }
        return res.json(vendors);
    })

  },
  recent_reviews: function(req, res){
    Review.find({}).sort('-createdAt').limit(3).exec( (err, reviews)=>{
      if(err){
          console.log(err);
        let errors = [];
            for(let i in err.errors){
              errors.push(err.errors[i].message);
            }
            return res.status(400).send(errors);
        }
        return res.json(reviews);
    })

  },
  recently_viewed: function(req, res){
  	//whenever we get a product, rotate the recently viewed array
  	User.findOne({_id: JSON.parse(localStorage.getItem('currentUser.user.id'))}).populate('recently_viewed').exec( (err, user)=>{
  		if(err){
          console.log(err);
        let errors = [];
            for(let i in err.errors){
              errors.push(err.errors[i].message);
            }
            return res.status(400).send(errors);
        }
        return res.json(user.recently_viewed);
  		//hopefully this returns just the array of products	
  	})


  },
  suggested_products: function(req, res){
  	//get up to 3 items from order history, get up to 3 tags from each- 3 tags total
  	//then do the search thing and return those items 	
  	User.findOne({_id: JSON.parse(localStorage.getItem('currentUser.user.id'))}).populate('orders_placed').exec( (err, user)=>{
        if(err){
          console.log(err);
        let errors = [];
            for(let i in err.errors){
              errors.push(err.errors[i].message);
            }
            return res.status(400).send(errors);
        }
        var criteria = [];
        if (typeof user.orders_placed[0] === 'undefined'){ //IF THERE ARE NO ORDERS PLACED YET
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
        } else if (typeof user.orders_placed[1] === 'undefined'){ //IF ONLY 1 ORDER
        	criteria.push(user.orders_placed[0].tags[0]);
        	criteria.push(user.orders_placed[0].tags[1]);
        	criteria.push(user.orders_placed[0].tags[2]);
        } else if (typeof user.orders_placed[2] === 'undefined'){ //IF ONLY 2
        	criteria.push(user.orders_placed[0].tags[0]);
        	criteria.push(user.orders_placed[0].tags[1]);
        	criteria.push(user.orders_placed[1].tags[0]);
        } else { //IF 3 OR MORE
        	criteria.push(user.orders_placed[0].tags[0]);
        	criteria.push(user.orders_placed[1].tags[0]);
        	criteria.push(user.orders_placed[2].tags[0]);
        }
        Product.find({ tags: { "$in" : criteria} }).limit(3).exec( (err, products)=>{ //FIND PRODUCTS BASED ON NEW CRITERIA
	        if(err){
	          console.log(err);
	        let errors = [];
	            for(let i in err.errors){
	              errors.push(err.errors[i].message);
	            }
	            return res.status(400).send(errors);
	        }
	        return res.json(products);
	    });
    })



  },
  get_item: function(req, res){
    Product.find({_id: req.params.id}, (err, product)=>{
        if(err){
          console.log(err);
        let errors = [];
            for(let i in err.errors){
              errors.push(err.errors[i].message);
            }
            return res.status(400).send(errors);
        }
        User.findOne({_id: JSON.parse(localStorage.getItem('currentUser.user.id'))}, (err, user)=>{
        	if(err){
                console.log(err);
                let errors = [];
                for(let i in err.errors){
                    errors.push(err.errors[i].message);
                }
            return res.status(400).send(errors);
            }
        	user.recently_viewed.shift();
        	user.recently_viewed[2] = product._id;
        })

        return res.json(product);
    })
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
      if(err){
          console.log(err);
        let errors = [];
            for(let i in err.errors){
              errors.push(err.errors[i].message);
            }
            return res.status(400).send(errors);
        }
        var prods = [];
        prods.push(products[Math.random()*products.length]);
        prods.push(products[Math.random()*products.length]);
        prods.push(products[Math.random()*products.length]);
        return res.json(prods);
    })

  },
  popular_items_from_store: function(req, res){
    Product.find({_vendor: req.params.id}).sort('-avgRating').limit(3).exec( (err, products)=>{
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
  create_item: function(req, res){
    console.log(req.body)
    let prod = new Product({title: req.body.title, description: req.body.description, price: req.body.price, _vendor: req.body._vendor, images: req.body.images, tags: req.body.tags});
    prod.save( (err, prod) => {
      console.log('hello again again')
      if (err) {
        console.log('false:', err)
        res.json({success: false}) // We should do something else here
      } else {
      	User.findOne({_id: req.body._vendor}, (err, vendor)=>{
      		if(err){
            console.log(err);
	        let errors = [];
	            for(let i in err.errors){
	              errors.push(err.errors[i].message);
	            }
	            return res.status(400).send(errors);
	        }
	        vendor.products_offered.push(prod._id);
	        vendor.save( (err, savedProd)=>{
	        	if(err){
	            console.log(err);
		        let errors = [];
		            for(let i in err.errors){
		              errors.push(err.errors[i].message);
		            }
		            return res.status(400).send(errors);
		        }
	        })
      	})
        console.log('true')
        res.json({success: true}) // and here.
      }
    })
    //tags can be just a single text input
    //and we can turn it into an array here
    //images could theoretically be done the same way
  },
  //**********************************
  //user controller methods \/
  //**********************************

  register_user: function(req, res) {
    console.log('hello')
    User.findOne({alias: req.body.alias}, (err, newUser)=>{
      if(err){
        console.log(err);
        let errors = [];
          for(let i in err.errors){
            errors.push(err.errors[i].message);
          }
          return res.status(400).send(errors);
        } else if (newUser == null) {
          console.log('hello again')
          let hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
          console.log(hash)
          let user = new User({alias: req.body.alias, email: req.body.email, password: hash}, (err, success) => {
            console.log(user)
            if (err) {
              console.log(err)
            } else {
              console.log(success)
            }
          })
          console.log(user)
          user.save( (err, user) => {
            console.log('hello again again')
            if (err) {
              console.log('false')
              res.json({success: false}) // We should do something else here
            } else {
              console.log('true')
              res.json({success: true}) // and here.
            }
          })
        }
    })
  },
  authenticate: (req, res) => {
    User.findOne({alias: req.body.alias}, (err, user) => {
      if (err) {
        console.log('Error in controller-login-findUser:', err)
      }
      if (!user) {
        res.status(403).json({success: false, message: 'User not found.'})
      } else if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          let token = jwt.sign(user, cert, {
            expiresIn: 86400 // expires in 24 hours
          });
          res.json({
            user: {
              alias: user.alias,
              id: user._id,
              vendor: user.vendor
            },
            success: true,
            token: token
          });
        } else {
          res.status(403).json({success: false, message: 'Authentication failed.'})
        }
      } else {
        console.log('Error in controller-auth-else.')
      }
    })
  },
  get_user: function(req, res){
    User.findOne({_id: req.params.id}, (err, user)=>{
      if(err){
          console.log(err);
        let errors = [];
            for(let i in err.errors){
              errors.push(err.errors[i].message);
            }
            return res.status(400).send(errors);
        }
        return res.json(user);

    })
  },
  get_vendor: function(req, res){
    User.findOne({_id: req.params.id}, (err, user)=>{ //could add extra layer where we check that vendor = true?
      if(err){
          console.log(err);
        let errors = [];
            for(let i in err.errors){
              errors.push(err.errors[i].message);
            }
            return res.status(400).send(errors);
        }
        return res.json(user);
    })
  }

  //**********************************
  //review controller methods \/
  //**********************************

  review_product: function(req, res){
    Product.findOne({_id: req.params.id}, (err, product)=>{ 
        if(err){
          console.log(err);
        let errors = [];
            for(let i in err.errors){
              errors.push(err.errors[i].message);
            }
            return res.status(400).send(errors);
        }
        let review = new Review({review: req.body.review, rating: req.body.rating, _byUser: JSON.parse(localStorage.getItem('currentUser.user.id')), _reviewedProduct: req.params.id});
        review.save( (err, savedReview)=>{
        	if(err){
            console.log(err);
	        let errors = [];
	            for(let i in err.errors){
	              errors.push(err.errors[i].message);
	            }
	            return res.status(400).send(errors);
	        }
        
	        product.totalRating += req.body.rating;
	        product.numReviews += 1;
	        product.avgRating = product.totalRating/product.numReviews;
	        product.save( (err, savedProduct)=>{
	        	if(err){
	            console.log(err);
		        let errors = [];
		            for(let i in err.errors){
		              errors.push(err.errors[i].message);
		            }
		            return res.status(400).send(errors);
		        }
		        return res.json(review);
	        })
	    })
        
    })

  },
  review_vendor: function(req, res){
    User.findOne({_id: req.params.id}, (err, user)=>{ //could add extra layer where we check that vendor = true?
      if(err){
          console.log(err);
        let errors = [];
            for(let i in err.errors){
              errors.push(err.errors[i].message);
            }
            return res.status(400).send(errors);
        }
        let review = new Review({review: req.body.review, rating: req.body.rating, _byUser: JSON.parse(localStorage.getItem('currentUser.user.id')), _reviewedVendor: req.params.id});
        review.save( (err, savedReview)=>{
        	if(err){
            console.log(err);
	        let errors = [];
	            for(let i in err.errors){
	              errors.push(err.errors[i].message);
	            }
	            return res.status(400).send(errors);
	        }
        
	        user.totalRating += req.body.rating;
	        user.numReviews += 1;
	        user.avgRating = user.totalRating/user.numReviews;
	        user.save( (err, saveduser)=>{
	        	if(err){
	            console.log(err);
		        let errors = [];
		            for(let i in err.errors){
		              errors.push(err.errors[i].message);
		            }
		            return res.status(400).send(errors);
		        }
		        return res.json(savedReview);
	        })
	    })
    })

  },



}
