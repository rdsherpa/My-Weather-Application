// let = {
//   apiKey:"a2e499dcd9906577a41fffe129b19c71",
//   fetch: funchtion () {
//     fetch("https://api.openweathermap.org/data/2.5/forecast?q=Los%20Angeles&appid=a2e499dcd9906577a41fffe129b19c71"),
//     .then((response) => response.json())
//     .then((data)=> console.log(data));
//   },
// };

function weatherRetriveCordinates(searchForCity){
  console.log("testing")
  fetch("http://api.openweathermap.org/geo/1.0/direct?q="+searchForCity+"&appid=a2e499dcd9906577a41fffe129b19c71").then(function(response){
    return response.json()
  }).then(function(data){
    console.log(data)
    var latitude = data[0].lat
    var longitude = data[0].lon
    getWeather(latitude, longitude)
  }).catch(function(error){
    console.log(error)
  })
}

function getWeather(lat, lng) {
  console.log(lat, lng)
  // fetch() using the 5-day forecast url given in the readme
  fetch("https://openweathermap.org/forecast5")
}
weatherRetriveCordinates("Los Angeles")

// getWeather: function(data) {
//   const {name} = data[0].name
//   const {}
// }