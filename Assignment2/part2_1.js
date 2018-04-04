var margin = {top: 20, right:20, bottom: 20, left: 20};

var h1 = 300 - margin.top - margin.bottom;
var w1 = 500 - margin.left - margin.right;

var h = 600 - margin.top - margin.bottom;
var w = 700 - margin.left - margin.right;

//For converting strings to Dates

//data
function getTime(csv){
  //console.log(csv.length);
  for(i=0; i<csv.length; i++){
    //console.log(i);
    //console.log(csv[i].RPT_DT);//Latitude,Longitude
  }
}

//read csv and draw bar chart
d3.csv("all_murder.csv", function(error, data) {
    if (error) {
    console.log(error);
  } else {
    console.log(data);
  }
  //getTime(data);
  var parseDate = d3.timeParse("%y/%m/%d");
  var intCountByDate = d3.nest()
                      .key(function(d) {//console.log(d.RPT_DT);
                                        //console.log(Date.parse(d.RPT_DT));
                                        //return Date.parse(d.RPT_DT);})
                                        return Date.parse(d.RPT_DT);})
                      .sortKeys(d3.ascending)
                      .key(function(d) {//console.log(d.RPT_DT);
                                        //console.log(Date.parse(d.RPT_DT));
                                        return d.RPT_DT;})
                      .key(function(d) {return d.CMPLNT_FR_TM;})
                      .sortKeys(d3.ascending)
                      .rollup(function(count) {//console.log(count.length);//count
                                                return count.length;})
                      .entries(data);
  console.log(intCountByDate);

  xScale = d3.scaleTime()
             .domain([
              d3.min(intCountByDate, function(d) {console.log(d.values[0].key);
                                                  return d.values[0].key;}),
              d3.max(intCountByDate, function(d) {return d.values[0].key;})
            ])
})

//Define map projection
var projection = d3.geoMercator()
           .scale(50000)
           .translate([w/2, h/2]);

var path = d3.geoPath()
             .projection(projection);
//Create SVG element
var geo_Map = d3.select("#geo_Map")
      .append("svg")
      .attr("width", w)
      .attr("height", h);

//json test
function getBorough(json){
  //console.log(json['features']);
  boroughColor=[];
  for(i=0; i<json['features'].length; i++){
    //console.log(json['features'][i]['properties']['BoroCode']);
    //console.log(json.features[i].properties.BoroCode);
    boroughColor[i] = json['features'][i]['properties']['BoroCode'];
  }
  return boroughColor;
};
//csv test
function getLocation(csv){
  console.log(csv.length);
  for(i=0; i<csv.length; i++){
    //console.log(csv[i].Latitude);//Latitude,Longitude
  }
}

function drawPoint(){
  d3.csv("all_murder.csv", function(error, data) {
    if (error) {
      console.log(error);
    } else {
      console.log(data);
    }
    geo_Map.selectAll("circle")
             .data(data)
             .enter()
             .append("circle")
             .attr("cx", function(d) {
               //console.log([d.Longitude, d.Latitude][0]);
               return projection([d.Longitude, d.Latitude])[0];
             })
             .attr("cy", function(d) {
               return projection([d.Longitude, d.Latitude])[1];
             })
             .attr("r", 1)
             .style("fill", "black")
             .style("stroke", "gray")
             .style("stroke-width", 0.25)
             .style("opacity", 0.75)
  });
}

function drawMap(){
  //Load in GeoJSON data
  d3.json("boroughs_nyc.json", function(error, json) {
    if (error) {
      throw error;
    } else {
      console.log(json)
    };

    //centerlize
    var center = d3.geoCentroid(json);
    projection.center(center);

    //Define path generator, now the path is correc after centerlize the json data

    //color
    //get Borough code
    var color = d3.scaleOrdinal(d3.schemeCategory10);

    //Bind data and create one path per GeoJSON feature
    geo_Map.selectAll("path")
       .data(json.features)
       .enter()
       .append("path")
       .attr("d", path)
       //.style("fill", "steelblue");
       .style("fill", function(d){
         boroughCode = d.properties.BoroCode//d.features[i].properties.BoroCode
         if (boroughCode) {
           return color(boroughCode);
           } else {
             //If value is undefined…
             return "#ccc";
           }
        });
    drawPoint();
  });
};
drawMap();
