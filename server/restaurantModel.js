// restaurantModel.js
var mongoose = require("mongoose");
// Setup schema
var restaurantSchema = mongoose.Schema({
  restaurant_id: String,
  restaurant_name: String,
  restaurant_img: String,
  restaurant_openingHours: [String],
  restaurant_address: String,
  restaurant_phone: String,
  restaurant_coords: {
    lat: Number,
    lng: Number
  },
  restaurant_website: String,
  restaurant_menuImgs: [String]
});

// Export Contact model
var Restaurant = (module.exports = mongoose.model(
  "restaurant",
  restaurantSchema
));
module.exports.get = function(callback, limit) {
  Restaurant.find(callback).limit(limit);
};
