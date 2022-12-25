const unirest = require("unirest");
var exports = module.exports = {};

exports.getLocalization = function(req, res,next){
    var apiCall = unirest("GET", "https://ip-geolocation-ipwhois-io.p.rapidapi.com/json/");
    apiCall.headers({
        "x-rapidapi-key": "3a170db7fcmsh82c688690ab4845p19ec9ajsn9d306d4751de",
        "x-rapidapi-host": "ip-geolocation-ipwhois-io.p.rapidapi.com",
        "useQueryString": true
    });
    apiCall.end(function (response) {
        if (response.error) 
            throw new Error(res.error);
        res.send(response.body);
    });
} 