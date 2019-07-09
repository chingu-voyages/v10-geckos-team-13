class Restaurant {
  /**
   * Restaurant Constructor
   * @param {string} name 
   * @param {string} imgUrl 
   * @param {string[]} openingHours 
   * @param {string} address 
   * @param {{lat: number, lng: number}} coords 
   * @param {string} website 
   * @param {string[]} menuImgs 
   */
  constructor(name = '', imgUrl = '', openingHours = [], address = '', coords = { lat: NaN, lng: NaN}, website = '', menuImgs = []) {
    this.id = Math.floor(Math.random()*10000);
    this.name = name;
    this.imgUrl = imgUrl;
    this.openingHours = openingHours;
    this.address = address;
    this.coords = coords;
    this.website = website;
    this.menuImgs = menuImgs;
  }
}

const restaurants = [
  new Restaurant(
    "Royaltea",
    "/assets/images/royaltea-restaurant.jpg",
    ["Weekdays 10am-10pm", "Weekends 8am-2am"],
    "2, Lorong Mesra Permai 6, Taman Mesra Permai, 13400 Butterworth, Pulau Pinang",
    { lat: 5.4304579, lng: 100.3908978},
    "http://www.royaltea.com.my/",
    ["/assets/images/royaltea-menu.jpg"]
  ),
  new Restaurant(
    "La Taste",
    "/assets/images/lataste-restaurant.jpg",
    ["Weekdays 10am-10pm", "Weekends 8am-2am"],
    "65, Lorong Teras Jaya 2, Kawasan Perniagaan Teras Jaya, 13400 Butterworth, Pulau Pinang",
    { lat: 5.4342738, lng: 100.3899578},
    "https://www.facebook.com/La-Taste-Butterworth-2037314776536491/",
    ["/assets/images/lataste-menu-1.jpg", "/assets/images/lataste-menu-2.jpg"]
  ),
  new Restaurant(
    "Raku Ichi",
    "/assets/images/rakuichi-restaurant.jpg",
    ["Weekdays 10am-10pm", "Weekends 8am-2am"],
    "4, Lorong Teras 2, Kawasan Perniagaan Teras Jaya, 13400 Butterworth, Pulau Pinang",
    { lat: 5.434253, lng: 100.3878743},
    "https://www.facebook.com/rakumaruramen/",
    ["/assets/images/rakuichi-menu-1.jpeg", "/assets/images/rakuichi-menu-2.jpeg", "/assets/images/rakuichi-menu-3.jpeg"]
  )
];

class Restaurants {
  static getRestaurant(id) {
    return restaurants.find(restaurant => restaurant.id === id);
  }

  static getRestaurants() {
    return restaurants.slice();
  }

  static addRestaurant(restaurant) {
    restaurants.push(restaurant);
  }
}

export default Restaurants;
export { Restaurant };