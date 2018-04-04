
//Define path generator, using the Albers USA projection
var path = d3.geoPath()
             .projection(d3.geoAlbersUsa());

//Graph width and height
var margin = {top: 20, right:20, bottom: 20, left: 20};
var h = 300 - margin.top - margin.bottom;
var w = 500 - margin.left - margin.right;

//Create SVG element
var svg = d3.select("body")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

//Load in GeoJSON data
d3.json("boroughs.geojson", function(json) {
//Bind data and create one path per GeoJSON feature
  svg.selectAll("path")
  .data(json.features)
  .enter()
  .append("path")
  .attr("d", path);
});

d3.csv("all_murder.csv", function(error, data) {
  if (error) {
    console.log(error);
  } else {
    console.log(data);
  }
  dataset = data;
});
