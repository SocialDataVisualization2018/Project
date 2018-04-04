
(function(){
//Global var and constant
		var dataset;
		var MONTH = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];

		var CATEGORY = ["3", "1", "2", "0"];// 3-veggi-storge, 1-fruit storage, 2-veggi fresh, 0-fruit fresh

//SVG

		//frame size
		var w = 500
		var h = 300

		//x-scale
		var xScale = d3.scaleLinear()
		  		  .domain([0, 12])
		  		  .range([0, 400])

		//X axis
		var xAxis = d3.axisBottom()
					  .scale(xScale)
					  .tickFormat(function(d,i){return MONTH[i];});

		//y-axis scale
		var yScale =  d3.scaleLinear()
		  		  .domain([0, 50])
		  		  .range([h, 0]);

		//
		var yAxis = d3.axisLeft()
					  .scale(yScale);
		//svg property
		var svg = d3.select("body")
					.append("svg")
					.attr("width", w+100)	//frame extension
					.attr("height", h+100)
					.append("g")
					.attr("transform", "translate(50, 50)");
		//Bar chart Drawing function
		var drawData = function(data, s) {
			var style = s.selectAll("svg")
						 .data(data, function(d) {return d.key;})
			   			 .enter()
						 .append("g")
        				 .attr("class", "stack")
			   			 .style("fill", function (d) {return color(d.key);});
			style.selectAll("rect")
					.data(function(d) {return d;})
					.enter()
					.append("rect")
					.attr("x", function(d) {return xScale(d.data.Month)+xScale(1)/4;})
					.attr("y", function(d) {return yScale(d[1]);})
					.attr("width", 15)
					.attr("height", function(d) {return yScale(d[0]) - yScale(d[1]);});

		}
//x axis
		function draw_xAxis(){
			svg.append("g")
			  .attr("class", "axis")
			  .attr("transform", "translate(0," + h + ")")// the axis coordination
			  .call(xAxis)
			  .selectAll("text")
    		  .attr("x", xScale(1)/2);

		}
		draw_xAxis();

			svg.append("g")
			  .attr("class", "axis")
			  .attr("transform", "translate(0, 0)")// the axis coordination
			  .call(yAxis);

//color
		var color = d3.scaleOrdinal(d3.schemeCategory10);

//data
		var extractData = function(d){
			var newData=[];
			for (i=0; i<MONTH.length; i++){
				var rowData={};
				rowData['Month'] = i;
				for(j=0; j<d.length; j++){
					//console.log(d[j][months[i]]);
					rowData[j] = d[j][MONTH[i]];
					//console.log(rowData[j]);
				}
				newData[i] = rowData;
			}
			return newData;
		}

		//stack
		var stackData = d3.stack().keys(CATEGORY);

//read csv and draw bar chart
		d3.csv("./CSV/IQuantNY1.csv", function(error, data) {
				if (error) {
				console.log(error);
			} else {
				console.log(data);
			}
			dataset = data;
			extractData(dataset);
			console.log(extractData(dataset));
			//console.log(extractData(dataset)[0]['Month']);
			console.log(stackData(extractData(dataset)));
			//console.log(stackData(extractData(dataset))[0][0].data);

			drawData(stackData(extractData(dataset)), svg);

		})
  })();
