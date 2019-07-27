// restaurantController.js
// Import restaurant model
let Restaurant = require("./restaurantModel");
const multer = require("multer");
const uuidv4 = require("uuid/v4");
const path = require("path");

// configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    /*
          Files will be saved in the 'uploads' directory. Make
          sure this directory already exists!
        */
    cb(null, "./public");
  },
  filename: (req, file, cb) => {
    /*
          uuidv4() will generate a random ID that we'll use for the
          new filename. We use path.extname() to get
          the extension from the original file name and add that to the new
          generated ID. These combined will create the file name used
          to save the file on the server and will be available as
          req.file.pathname in the router handler.
        */
    const newFilename = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, newFilename);
  }
});
// create the multer instance that will be used to upload/save the file
//const upload = multer({ storage });
//const upload = multer({ storage });
var upload = multer({ storage: storage }).array("selectedFile");

// Handle index actions
exports.index = function(req, res) {
  Restaurant.get(function(err, restaurants) {
    if (err) {
      res.json({
        status: "error",
        message: err
      });
    }
    res.json({
      status: "success",
      message: "Restaurants retrieved successfully",
      data: restaurants
    });
  });
};

// Handle create restaurant actions
// exports.new = function(req, res) {
//   var restaurant = new Restaurant(req.body);
//   // save the contact and check for errors
//   restaurant.save(function(err) {
//     // Check for validation error
//     if (err) res.json(err);
//     else
//       res.json({
//         message: "New restaurant created!",
//         data: restaurant
//       });
//   });
// };

// Handle view restaurant info
exports.view = function(req, res) {
  Restaurant.findOne({ _id: req.params.restaurant_id }, function(
    err,
    restaurant
  ) {
    if (err) res.send(err);
    res.json({
      message: "Restaurant details",
      data: restaurant
    });
  });
};

// Handle delete contact
exports.delete = function(req, res) {
  Restaurant.deleteOne(
    {
      _id: req.params.restaurant_id
    },
    function(err, restaurant) {
      if (err) res.send(err);
      res.json({
        status: "success",
        message: "restaurant deleted"
      });
    }
  );
};

// Handle search
exports.search = function(req, res) {
  Restaurant.find(
    {
      restaurant_name: { $regex: req.query.q, $options: "i" }
    },
    function(err, restaurants) {
      if (err) res.send(err);
      res.json({
        message: "Search result",
        data: restaurants
      });
    }
  );
};

exports.update = function(req, res) {
  upload(req, res, function(err) {
    console.log(req.files);
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }

    //console.log(req.params.restaurant_id);
    Restaurant.findById(req.params.restaurant_id, function(err, restaurant) {
      if (err) res.send(err);

      if (req.files.length > 0) {
        restaurant.restaurant_img = req.files[0].filename;
      }

      restaurant.restaurant_name = req.body.restaurantName;
      restaurant.restaurant_address = req.body.restaurantAddress;
      restaurant.restaurant_phone = req.body.restaurantPhone;
      restaurant.restaurant_website = req.body.restaurantWebsite;
      restaurant.restaurant_openingHours = JSON.parse(req.body.openingHours);
      restaurant.restaurant_coords = JSON.parse(req.body.coords);

      var menu = [];
      for (var x = 1; x < req.files.length; x++) {
        menu.push(req.files[x].filename);
      }

      if (menu.length > 0) {
        restaurant.restaurant_menuImgs = menu;
      }

      // save the contact and check for errors
      restaurant.save(function(err) {
        if (err) res.json(err);
        res.json({
          message: "Restaurant Info updated",
          data: restaurant
        });
      });
    });
  });
};

exports.new = function(req, res) {
  upload(req, res, function(err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }

    var restaurant = new Restaurant();

    restaurant.restaurant_img = req.files[0].filename;
    restaurant.restaurant_name = req.body.restaurantName;
    restaurant.restaurant_address = req.body.restaurantAddress;
    restaurant.restaurant_phone = req.body.restaurantPhone;
    restaurant.restaurant_website = req.body.restaurantWebsite;
    restaurant.restaurant_openingHours = JSON.parse(req.body.openingHours);
    restaurant.restaurant_coords = JSON.parse(req.body.coords);

    var menu = [];
    for (var x = 1; x < req.files.length; x++) {
      menu.push(req.files[x].filename);
    }
    restaurant.restaurant_menuImgs = menu;

    restaurant.save(function(err) {
      if (err) res.json(err);
      else
        res.json({
          message: "New restaurant created!",
          data: restaurant
        });
    });
  });
};