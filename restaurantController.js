// restaurantController.js
// Import restaurant model
let Restaurant = require("./restaurantModel");
const multer = require("multer");
const uuidv4 = require("uuid/v4");
const path = require("path");
var AWS = require("aws-sdk");
var fs = require("fs");

// configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    const newFilename = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, newFilename);
  }
});
// create the multer instance that will be used to upload/save the file
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

const BUCKET_NAME = "menu-please";
const IAM_USER_KEY = process.env.IAM_USER_KEY;
const IAM_USER_SECRET = process.env.IAM_USER_SECRET;

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
  let images = [];
  Restaurant.findOne(
    {
      _id: req.params.restaurant_id
    },
    function(err, restaurant) {
      if (err) res.send(err);
      images.push(restaurant.restaurant_img);
      restaurant.restaurant_menuImgs.forEach(x => {
        images.push(x);
      });

      let s3bucket = new AWS.S3({
        accessKeyId: IAM_USER_KEY,
        secretAccessKey: IAM_USER_SECRET,
        Bucket: BUCKET_NAME,
        region: "ap-southeast-1"
      });

      var ResponseData = [];

      images.map(item => {
        var params = {
          Bucket: "menu-please/uploads",
          Key: item
        };
        s3bucket.deleteObject(params, function(err, data) {
          if (err) {
            res.json({ error: true, Message: err });
          } else {
            ResponseData.push(data);
            if (ResponseData.length == images.length) {
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
            }
          }
        });
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
    const file = req.files;

    let s3bucket = new AWS.S3({
      accessKeyId: IAM_USER_KEY,
      secretAccessKey: IAM_USER_SECRET,
      Bucket: BUCKET_NAME,
      region: "ap-southeast-1"
    });

    var ResponseData = [];

    file.map(item => {
      var params = {
        Bucket: "menu-please/uploads",
        Key: item.filename,
        Body: fs.createReadStream(item.path),
        ACL: "public-read"
      };
      s3bucket.upload(params, function(err, data) {
        if (err) {
          res.json({ error: true, Message: err });
        } else {
          ResponseData.push(data);
          if (ResponseData.length == file.length) {
            Restaurant.findById(req.params.restaurant_id, function(
              err,
              restaurant
            ) {
              if (err) res.send(err);
              //delete previous images
              let images = [];
              images.push(restaurant.restaurant_img);
              restaurant.restaurant_menuImgs.forEach(x => {
                images.push(x);
              });

              var ResponseData = [];

              images.map(item => {
                var params = {
                  Bucket: "menu-please/uploads",
                  Key: item
                };
                s3bucket.deleteObject(params, function(err, data) {
                  if (err) {
                    res.json({ error: true, Message: err });
                  } else {
                    ResponseData.push(data);
                    if (ResponseData.length == images.length) {
                      //save new restaurant
                      //if (req.files.length > 0) {
                      restaurant.restaurant_img = req.files[0].filename;
                      //}
                      restaurant.restaurant_name = req.body.restaurantName;
                      restaurant.restaurant_address =
                        req.body.restaurantAddress;
                      restaurant.restaurant_phone = req.body.restaurantPhone;
                      restaurant.restaurant_website =
                        req.body.restaurantWebsite;
                      restaurant.restaurant_openingHours = JSON.parse(
                        req.body.openingHours
                      );
                      restaurant.restaurant_coords = JSON.parse(
                        req.body.coords
                      );

                      var menu = [];
                      for (var x = 1; x < req.files.length; x++) {
                        menu.push(req.files[x].filename);
                      }
                      //if (menu.length > 0) {
                      restaurant.restaurant_menuImgs = menu;
                      //}

                      restaurant.save(function(err) {
                        if (err) res.json(err);
                        res.json({
                          message: "Restaurant Info updated",
                          data: restaurant
                        });
                      });
                    }
                  }
                });
              });
              //
            });
          }
        }
      });
    });
  });
};

exports.new = function(req, res) {
  upload(req, res, function(err) {
    const file = req.files;

    let s3bucket = new AWS.S3({
      accessKeyId: IAM_USER_KEY,
      secretAccessKey: IAM_USER_SECRET,
      Bucket: BUCKET_NAME,
      region: "ap-southeast-1"
    });

    var ResponseData = [];

    file.map(item => {
      var params = {
        Bucket: "menu-please/uploads",
        Key: item.filename,
        Body: fs.createReadStream(item.path),
        ACL: "public-read"
      };
      s3bucket.upload(params, function(err, data) {
        if (err) {
          res.json({ error: true, Message: err });
        } else {
          ResponseData.push(data);
          if (ResponseData.length == file.length) {
            var restaurant = new Restaurant();
            restaurant.restaurant_img = req.files[0].filename;
            restaurant.restaurant_name = req.body.restaurantName;
            restaurant.restaurant_address = req.body.restaurantAddress;
            restaurant.restaurant_phone = req.body.restaurantPhone;
            restaurant.restaurant_website = req.body.restaurantWebsite;
            restaurant.restaurant_openingHours = JSON.parse(
              req.body.openingHours
            );
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
          }
        }
      });
    });
  });
};
