var mongoose = require('mongoose');
var User = mongoose.model('User');
var Product = mongoose.model('Product');
var Review = mongoose.model('Review');
var bcrypt = require('bcrypt');



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

  },
  suggested_products: function(req, res){

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
        return res.json(products);
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
    let prod = new Product({title: req.body.title, description: req.body.description, price: req.body.price, _vendor: req.session.user_id});
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
    User.find({_id: req.params.id}, (err, user)=>{
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
    User.find({_id: req.params.id}, (err, user)=>{ //could add extra layer where we check that vendor = true?
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

}
