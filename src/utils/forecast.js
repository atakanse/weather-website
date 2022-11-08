const request = require("postman-request");

// const forecast = (latitude, longitude, callback) => {
//     const url = 'http://api.weatherstack.com/current?access_key=' + latitude + ',' + longitude

//     request({ url, json: true }, (error, { body }) => {
//         if (error) {
//             callback('Unable to connect to weather service!', undefined)
//         } else if (body.error) {
//             callback('Unable to find location', undefined)
//         } else {
//             callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')
//         }
//     })
// }

const forecast = (address, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=803e71342f098cee0c9ef9e060283240&query=" +
    address;
  request({ url: url, json: true }, (error, apiResponse) => {
    if (apiResponse.body.success != undefined && !apiResponse.body.success) {
        console.log("something wrong");
      callback("something wrong", undefined, undefined);
    } else {
      console.log(
        `Current temperature in ${apiResponse.body.location.name} is ${apiResponse.body.current.temperature}℃`
      );

      callback(
        undefined,
        apiResponse.body.location.name,
        apiResponse.body.current.temperature
      );
    }
  });
};
module.exports = forecast;
