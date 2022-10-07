// Creating our initial map object:
// We set the longitude, latitude, and starting zoom level.
// This gets inserted into the div with an id of "map".
let myMap = L.map("map").setView([51.505, -0.09], 10);

//Define GeoJSON url for earthquakes
var earthquakesURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_day.geojson"


  // Adding a tile layer (the background map image) to our map:
  // We use the addTo() method to add objects to our map.
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);
  
  var earthquakeIcon = L.icon({
      iconUrl: "../Leaflet-Part-1/Resources/earthquake.png", iconWidth: 16, inconHeight: 16, iconAnchorX: 8, iconAnchorX: 8, iconAnchorY: 8,
      shadowUrl: "earthquake.png",
      iconSize: [38,95],
      shadowSize: [50,64],
      iconAnchor: [22,94],
      shadowAnchor: [4,62],
      popupAnchor:[-3, -76]
  });
  L.marker([51.5, -0.09], {icon: eqIcon}).addTo(map);

