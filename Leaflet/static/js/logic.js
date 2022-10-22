// ------------ Main Map -----------------
//Define GeoJSON url for earthquakes
let earthquakesURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_day.geojson"
let techtonicplateURL = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json"

// Create the base layers.
let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})

let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

  // Create a baseMaps object.
let baseMaps = {
    "Street Map": street,
    "Topographic Map": topo
};

  // Create an overlay object to hold our overlay.
let earthquakes = new L.LayerGroup();
let techtonicplate =  new L.LayerGroup();
let overlayMaps = {
    "Earthquakes": earthquakes,
    "techtonicplates": techtonicplate
};


// Create our map, giving it the streetmap and earthquakes layers to display on load.
let myMap = L.map("map", {
    center: [
      40.7, -94.5
    ],
    zoom: 3,
    layers: [street, earthquakes]
});

// Create a layer control.
// Pass it our baseMaps and overlayMaps.
// Add the layer control to the map.
L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
}).addTo(myMap);

// ------------ Earthquake Layer -----------------

//Perform a GET request to the query URL (earthquakesURL)
d3.json(earthquakesURL).then(function (data) {
  // Once we get a response, send the data.features object to the createFeatures function.
  // console.log(data); 
  // createFeatures(data.features);

  // Function for styling information
  function styleInfo(feature){
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: getColor(feature.properties.mag),
      color: "#000000",
      radius: getRadius(feature.properties.mag),
      stroke: true,
      weight: 0.5
    };
  }
  // Function for colors of the magnitudes
  function getColor(magnitude){
    if (magnitude > 5) {
      return "#ea2c2c";
    }
    if (magnitude > 4) {
      return "#ECB92D";
    }
    if (magnitude > 3) {
      return "#F9F966";
    }
    if (magnitude > 2) {
      return "#35D45A";
    }
    if (magnitude > 1) {
      return "#00FF3C";
    }
    return "#ffffff"
  }
  // Function for the radius
  function getRadius(magnitude){
    if (magnitude === 0)
      return 1
    return magnitude * 4;
  }
  // L.geojson layer
  L.geoJSON(data,{
      pointToLayer: function(feature, latlng) {
        console.log(data);
        return L.circleMarker(latlng);
      },
  // We set the style for each circleMarker using our styleInfo function.
  style: styleInfo,
 // We create a popup for each circleMarker to display the magnitude and location of the earthquake
 //  after the marker has been created and styled.
   onEachFeature: function(feature, layer) {
   layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place)}
   }).addTo(earthquakes) 

   earthquakes.addTo(myMap)
  });

//-------------Techtonic Plate Layer-------------------
d3.json(techtonicplateURL).then(function (platedata) {
 
  // L.geojson layer
  L.geoJSON(platedata,{
    // add color


   }).addTo(techtonicplate) 
   techtonicplate.addTo(myMap);
  


//---------------Add legend ---------------------------
let legend = L.control({position: "bottomright"});
legend.onAdd = function () {

    let div = L.DomUtil.create("div", "info legend");
    let grades = [0,1,2,3,4,5];
    let colors = [ 
        "#ea2c2c",
        "#ECB92D",
        "#F9F966",
        "#35D45A",
        "#00FF3C",
        "#ffffff",
    ];

    for (let i = 0; i < grades.length; i++) {
            div.innerHTML += 
            "<i style=' background: " + colors[i] + "'></i> "
            + grades[i] +(grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
        }
    return div;
    };
    legend.addTo(myMap);
});



// If you want to add an icon instead of having bubbles  
// let earthquakeIcon = L.icon({
//     iconUrl: "Leaflet-Part-1/earthquake.png", iconWidth: 16, inconHeight: 16, iconAnchorX: 8, iconAnchorX: 8, iconAnchorY: 8,
//     shadowUrl: "earthquake.png",
//     iconSize: [38,95],
//     shadowSize: [50,64],
//     iconAnchor: [22,94],
//     shadowAnchor: [4,62],
//     popupAnchor:[-3, -76]
// });
// L.marker([51.5, -0.09], {icon: eqIcon}).addTo(map);

