import axios from "axios";
import { HERE_API_ID, HERE_API_CODE } from "../private/config.json";

const geocodePath = "https://geocoder.api.here.com/6.2/geocode.json";
const reverseGeocodePath =
  "https://reverse.geocoder.api.here.com/6.2/reversegeocode.json";

class GeocodingService {
  static geocode(address) {
    return axios.get(geocodePath, {
      params: {
        app_id: HERE_API_ID,
        app_code: HERE_API_CODE,
        searchtext: address
      }
    });
  }

  static reverseGeocode(coords) {
    const prox = `${coords.lat},${coords.lng},50`;
    return axios
      .get(reverseGeocodePath, {
        params: {
          app_id: HERE_API_ID,
          app_code: HERE_API_CODE,
          mode: "retrieveAddresses",
          maxresults: 1,
          minresults: 1,
          prox: prox
        }
      })
      .then(res => {
        return res.data.Response.View[0].Result[0].Location.Address.Label;
      });
  }
}

export default GeocodingService;
