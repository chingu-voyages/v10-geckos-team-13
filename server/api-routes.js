// api-routes.js
// Initialize express router
let router = require("express").Router();
// Set default API response
router.get("/", function(req, res) {
  res.json({
    status: "API Its Working",
    message: "Welcome to Server!"
  });
});
// Import restaurant controller
var restaurantController = require("./restaurantController");
// Restaurant routes
router
  .route("/restaurants")
  .get(restaurantController.index)
  .post(restaurantController.new);

router.route("/restaurants/search").get(restaurantController.search);

router.route("/restaurants/:restaurant_id").get(restaurantController.view);

// Export API routes
module.exports = router;
