const axios = require('axios');

class APIHandler {
  constructor() {
    this.app = axios.create({
        baseURL: 'https://maps.googleapis.com/maps/api/geocode/json?address='
    });
	  this.key ='&key=AIzaSyBkzgyhP_CswYl13k5mNkOJu2Nldp3Y-Ys'
	}

  getLocation = (address) => this.app.get(`${address}${this.key}`)


}

module.exports = APIHandler;
