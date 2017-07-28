var mongoose = require('mongoose');
var User = mongoose.model('User');
var Product = mongoose.model('Product');
var Review = mongoose.model('Review');
var Order = mongoose.model('Order')
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
    Product.find({}).populate('_vendor').exec( (err, products)=>{
      if(err){
          console.log(err);
        let errors = [];
            for(let i in err.errors){
              errors.push(err.errors[i].message);
            }
            return res.status(400).send(errors);
        }
        //console.log(products)
        var prods = [];
        prods.push(products[Math.floor(Math.random()*products.length)]);
        prods.push(products[Math.floor(Math.random()*products.length)]);
        prods.push(products[Math.floor(Math.random()*products.length)]);
        return res.json({'prods': prods});
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
        //prods.push(products[Math.random()*products.length]);
        //prods.push(products[Math.random()*products.length]);
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
    User.findOne({_id: req.params.id}).populate('recently_viewed').exec( (err, user)=>{
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
  order_history: function(req, res){
    //whenever we get a product, rotate the recently viewed array
    User.findOne({_id: req.params.id}).populate({path: 'orders_placed', populate: {path: '_vendor'}}).exec( (err, user)=>{
      if(err){
          console.log(err);
        let errors = [];
            for(let i in err.errors){
              errors.push(err.errors[i].message);
            }
            return res.status(400).send(errors);
        }
        return res.json(user.orders_placed);
      //hopefully this returns just the array of products
    })


  },
  suggested_products: function(req, res){
    //get up to 3 items from order history, get up to 3 tags from each- 3 tags total
    //then do the search thing and return those items
    User.findOne({_id: req.params.id}).populate('orders_placed').populate('recently_viewed').exec( (err, user)=>{
        if(err){
            console.log(err);
          let errors = [];
            for(let i in err.errors){
              errors.push(err.errors[i].message);
            }
            return res.status(400).send(errors);
        } else {
	        var criteria = "";
	        if (typeof user.orders_placed[0] != 'undefined'){
	        	criteria += user.orders_placed[0].tags;
	        }//IF THERE ARE NOT ENOUGH ORDERS PLACED YET
	        if (typeof user.orders_placed[1] != 'undefined'){
	        	criteria += user.orders_placed[1].tags;
	        }
	        if (typeof user.orders_placed[2] != 'undefined'){
	        	criteria += user.orders_placed[2].tags;
	        }
	        if (typeof user.recently_viewed[0] != 'undefined'){
	        	criteria += user.recently_viewed[0].tags;
	        }
	        if (typeof user.recently_viewed[1] != 'undefined'){
	        	criteria += user.recently_viewed[1].tags;
	        }
	        if (typeof user.recently_viewed[2] != 'undefined'){
	        	criteria += user.recently_viewed[2].tags;
	        }
	        if(criteria.split(' ').length < 3){
	        	Product.find({}).limit(3).populate("_vendor").exec( (err, products)=>{
			        if(err){
			            console.log(err);
			            let errors = [];
			                for(let i in err.errors){
			                    errors.push(err.errors[i].message);
			                }
			            console.log("error found line 175");
			            return res.status(400).send(errors);
			        } else {
			        	console.log("returning random products line 178");
			        	return res.json(products);
			        }
		        })
	        } else {

		        Product.find({ $text: { $search: criteria } }, { score: { $meta: "textScore" } }).populate('_vendor').sort( { score: { $meta: "textScore" } } ).limit(3).exec( (err, products)=>{
					if(err){
			            console.log(err);
			          let errors = [];
			            for(let i in err.errors){
			              errors.push(err.errors[i].message);
			            }
			            console.log("error found line 191");
			            return res.status(400).send(errors);
			        } else {
			        	console.log("Sending back matching products line 194");
			        	return res.json(products);
			    	}
		        })
		    }
	    }
    })



  },
  get_item: function(req, res){
    Product.findOne({_id: req.params.product_id}).populate('_vendor').exec( (err, product)=>{
        if(err){
          console.log(err);
        let errors = [];
            for(let i in err.errors){
              errors.push(err.errors[i].message);
            }
            return res.status(400).send(errors);
        }
        User.findOne({_id: req.params.user_id}, (err, user)=>{
            if(err){
                console.log(err);
                let errors = [];
                for(let i in err.errors){
                    errors.push(err.errors[i].message);
                }
              return res.status(400).send(errors);
            }
            if (user.recently_viewed.indexOf(product._id)<0){
              if(user.recently_viewed.length < 3){
              user.recently_viewed.push(product._id);
              } else {
                user.recently_viewed.shift();
                user.recently_viewed[2] = product._id;
              }
              user.save( (err, savedUser)=> {
                if(err){
                    console.log(err);
                    let errors = [];
                    for(let i in err.errors){
                        errors.push(err.errors[i].message);
                    }
                  return res.status(400).send(errors);
                }
              })
            }

        })
        return res.json(product);
    })
  },
  get_item_nolog: function(req, res){
    Product.findOne({_id: req.params.product_id}).populate('_vendor').exec( (err, product)=>{
        if(err){
          console.log(err);
        let errors = [];
            for(let i in err.errors){
              errors.push(err.errors[i].message);
            }
            return res.status(400).send(errors);
        }
        return res.json(product);
    })
  },
  find_item: function(req, res){
    console.log("MADE it to find_item in controller");
    //console.log(req.body);
    var search = req.params.search_criteria.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
    search = search.replace(/\s{2,}/g," ");
    search = search.toLowerCase();
    //var criteria = search.split(" ");
    //console.log(criteria);

  Product.find({ $text: { $search: search } }, { score: { $meta: "textScore" } }).populate('_vendor').sort( { score: { $meta: "textScore" } } ).exec( (err, products)=>{
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
  my_items: function(req, res){
    Product.find({_vendor: req.params.id}, (err, products)=>{
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
    let prod = new Product({title: String(req.body.title), description: String(req.body.description), price: Number(req.body.price), _vendor: String(req.body._vendor), images: String(req.body.images), tags: String(req.body.tags), avgRating: Math.floor(Math.random() * 5)});
    prod.save( (err, prod) => {
      //console.log('hello again again')
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
    //console.log('hello')
    User.findOne({alias: req.body.alias}, (err, newUser)=>{
      if(err){
        console.log(err);
        let errors = [];
          for(let i in err.errors){
            errors.push(err.errors[i].message);
          }
          return res.status(400).send(errors);
        } else if (newUser == null) {
          //console.log('hello again')
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
              let token = jwt.sign(user, cert, {
                expiresIn: 86400 // expires in 24 hours
              });
              res.json({
                user: {
                  alias: user.alias,
                  id: user._id,
                  vendor: user.vendor,
                  basket: user.basket
                },
                success: true,
                token: token
              });
            }
          })
        }
    })
  },
  authenticate: (req, res) => {
    User.findOne({alias: String(req.body.alias)}, (err, user) => {
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
              vendor: user.vendor,
              basket: user.basket
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
  },

  get_basket: function(req, res){
    // console.log("MADE IT TO GET BASKET IN CONTROLLER");
  User.findOne({_id: req.params.id}).populate({path: 'basket', populate: {path: '_vendor'}}).exec( (err, user)=>{
    if(err){
    console.log(err);
    let errors = [];
      for(let i in err.errors){
        errors.push(err.errors[i].message);
      }
      return res.status(400).send(errors);
    }
    return res.json(user);
  });
  },

  add_to_basket: function(req, res){
    User.findOne({_id: req.body.userId}).populate('basket').exec( (err, user) =>{
    // console.log("MADE IT TO ADD TO BASKET FUNCTION IN CONTROLLER");
    if(err){
    console.log(err);
    let errors = [];
      for(let i in err.errors){
        errors.push(err.errors[i].message);
      }
      return res.status(400).send(errors);
    }
    function containsObject(obj, list) {
        var i;
        for (i = 0; i < list.length; i++) {
            if (list[i]._id == obj._id) {
                return true;
            }
        }
        return false;
    }
    if (!containsObject(req.body.product, user.basket)){
      user.basket.push(req.body.product)
    //   console.log("MADE IT TO PUSHING ITEM TO BASKET");
    //   console.log("USER: " + user);
      user.save( (err, savedUser) => {
        if(err){
        console.log(err);
        let errors = [];
          for(let i in err.errors){
            errors.push(err.errors[i].message);
          }
          return res.status(400).send(errors);
        } else {
          console.log("USER.BASKET: " + user.basket);
          return res.json(user.basket);
        }
      })
    } else {
      console.log("USER.BASKET: " + user.basket);
      return res.json(user.basket);
    }
  })
  },

  remove_from_basket: function(req, res){
	User.findOne({_id: req.body.userId}, (err, user) => {
		if(err){
		console.log(err);
		let errors = [];
			for(let i in err.errors){
			  errors.push(err.errors[i].message);
			}
			return res.status(400).send(errors);
		}
		//console.log("Product_id: ", req.body.product._id)
		function isProduct(item){
			return String(item) === String(req.body.product._id)
		}
		let index = user.basket.findIndex(isProduct)
		user.basket.splice(index, 1)
		//console.log("Index: ", index)
		//console.log("Length", user.basket.length)
		user.save( (err, savedUser) => {
			if(err){
			console.log(err);
			let errors = [];
				for(let i in err.errors){
				  errors.push(err.errors[i].message);
				}
				return res.status(400).send(errors);
			}
			return res.json(savedUser)
		})
	});
  },

  payment: function(req, res){
    User.findOne({_id: req.body.userId}, (err, user) => {
      if(err){
      let errors = [];
        for(let i in err.errors){
        errors.push(err.errors[i].message);
        }
        return res.status(400).send(errors);
      }
      user.payments.push(req.body.token)
      user.save( (err, savedUser) => {
        if(err){
        let errors = [];
          for(let i in err.errors){
          errors.push(err.errors[i].message);
          }
          return res.status(400).send(errors);
        }
        res.json(savedUser)
      })
    })
  },

  process_order: function(req, res){
	    console.log("Controller received: ", req.body)
    	User.findOne({_id: req.body.user.id}, (err, user) => {
	        if(err){
		        let errors = [];
		        for(let i in err.errors){
		        	errors.push(err.errors[i].message);
		        }
		        return res.status(400).send(errors);
	        }
	        let new_order = user.basket.slice()
	        console.log("New Order: ", new_order)
	        console.log("User basket: ", user.basket)
	        user.order_holder.push(new_order)
	        user.basket = []
	        user.save( (err, savedUser) => {
		        if(err){
		            let errors = [];
		            for(let i in err.errors){
		            	errors.push(err.errors[i].message);
		            }
		            return res.status(400).send(errors);
		        }
		        res.json(savedUser)
	        })
        })
  },

  //**********************************
  //review controller methods \/
  //**********************************

  review_product: function(req, res){
    	Product.findOne({_id: req.body._reviewedProduct}, (err, product)=>{
	        if(err){
	            console.log(err);
		        let errors = [];
		            for(let i in err.errors){
		              errors.push(err.errors[i].message);
		            }
		            return res.status(400).send(errors);
		    }
	        let review = new Review({review: req.body.review, rating: req.body.rating, _byUser: req.body._byUser, _reviewedProduct: req.body.reviewedProduct});
	        review.save( (err, savedReview)=>{
	          if(err){
	            console.log(err);
	          let errors = [];
	              for(let i in err.errors){
	                errors.push(err.errors[i].message);
	              }
	              return res.status(400).send(errors);
	          }

	          product.totalRating += parseInt(req.body.rating);
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
	            console.log("REVIEW: " + savedReview);
	            return res.json(savedReview);
	          })
	      	})

    	})

  },
  review_vendor: function(req, res){
    User.findOne({_id: req.body._reviewedVendor}, (err, user)=>{ //could add extra layer where we check that vendor = true?
      if(err){
          console.log(err);
        let errors = [];
            for(let i in err.errors){
              errors.push(err.errors[i].message);
            }
            return res.status(400).send(errors);
        }
        let review = new Review({review: req.body.review, rating: req.body.rating, _byUser: req.body._byUser, _reviewedVendor: req.body._reviewedVendor});
        review.save( (err, savedReview)=>{
          if(err){
            console.log(err);
          let errors = [];
              for(let i in err.errors){
                errors.push(err.errors[i].message);
              }
              return res.status(400).send(errors);
          }

          user.totalRating += parseInt(req.body.rating);
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
  get_reviews: function(req, res){
    Review.find({_reviewedProduct: req.params.id}, (err, reviews)=>{
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


}
