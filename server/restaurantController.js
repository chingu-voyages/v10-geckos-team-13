// restaurantController.js
// Import restaurant model
let Restaurant = require("./restaurantModel");
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
exports.new = function(req, res) {
  var restaurant = new Restaurant(req.body);
  // save the contact and check for errors
  restaurant.save(function(err) {
    // Check for validation error
    if (err) res.json(err);
    else
      res.json({
        message: "New restaurant created!",
        data: restaurant
      });
  });
};
