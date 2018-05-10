
(function(){

//SVG

		//frame size
		var margin = {top: 20, right:20, bottom: 20, left: 20};
	  var h = 400 - margin.top - margin.bottom;
	  var w = 600 - margin.left - margin.right;

		//svg property
		var bar = d3.select("body")
					.append("svg")
							.attr("width", w+200)	//frame extension
							.attr("height", h+100)
					.append("g")
							.attr("transform", "translate(50, 50)");

//x - scale
		var MONTH = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
		var xScale = d3.scaleLinear()
		  		  			 .domain([0, 12])		//domain of a linear value range
		  		  	 		 .range([0, w])

//		var xScale = d3.scaleBand()
//							     .domain(d3.range(MONTH.length))
//									 .rangeRound([0, w])
//									 .paddingInner(0.6);

		//x axis
		var xAxis = d3.axisBottom()
					  			.scale(xScale)
					  			.tickFormat(function(d,i){return MONTH[i];});

		function draw_xLable(svg){
			svg.append("text")
						.attr("transform", "translate(" + w/2 + "," + -10  + ")") //lable location
						.style("text-anchor", "middle")
						.text("NYC Green Markets - Unique Produce Types");
		}
		draw_xLable(bar);
//y-axis scale
		var yScale =  d3.scaleLinear()
		  		  				.domain([0, 50])
		  		  				.range([h, 0]);

		var yAxis = d3.axisLeft()
					  		  .scale(yScale);

		//grid line
		var yGrid = d3.axisLeft()
									.tickFormat("")
									.tickSize(-w)
									.scale(yScale);

		function draw_yGrid(svg){
			bar.append("g")
			.attr("class", "grid")
			.attr("transform", "translate(0, 0)")// the axis coordination
			.call(yGrid);
		}
		draw_yGrid(bar);

		//X - axis
		function draw_xAxis(svg){
			svg.append("g")
						.attr("class", "axis")
						.attr("transform", "translate(0," + h + ")")// the axis coordination
				 .call(xAxis)
				 .selectAll("text")
						.attr("x", xScale(1)/2);
		}
		draw_xAxis(bar);

		//Y - axis
		function draw_yAxis(svg){
			bar.append("g")
				 		.attr("class", "axis")
				 		.attr("transform", "translate(0, 0)")// the axis coordination
				 .call(yAxis);
		}
		draw_yAxis(bar);

		function draw_yLable(svg){
			svg.append("text")
						.attr("transform", "rotate(-90)")
						.attr("y", 0 - margin.left-10)
						.attr("x",0 - (h / 2))
						.style("text-anchor", "middle")
						.text("# of Unique Kinds of Produce");
		}
		draw_yLable(bar);


		//Bar chart Drawing function
		var drawData = function(data, svg) {
			var style = svg.selectAll("svg")
						 .data(data, function(d) {return d.key;})
			   			 .enter()
						 .append("g")
        				 .attr("class", "stack")
			   		 .style("fill", function (d) {return color(d.key);});
			style.selectAll("rect")
					.data(function(d) {return d;})
					.enter()
					.append("rect")
						.attr("x", function(d) {return xScale(d.data.Month)+xScale(1)/4;}) //coordinate x
						.attr("y", function(d) {return yScale(d[1]);})	//  coordinate y
						.attr("width", xScale(1)/3)	//bar width, display unit
						.attr("height", function(d) {return yScale(d[0]) - yScale(d[1]);});	//bar height, display unit
		}

//color
		var color = d3.scaleOrdinal(d3.schemeCategory10);

//data
		 function extractData(d){
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
		var CATEGORY = ["3", "1", "2", "0"];// 3-veggi-storge, 1-fruit storage, 2-veggi fresh, 0-fruit fresh
		var stackData = d3.stack().keys(CATEGORY); //special function

//read csv and draw bar chart
		d3.csv("./CSV/IQuantNY1.csv", function(error, data) {
				if (error) {
				console.log(error);
			} else {
				console.log(data);
			}
			var dataset;
			dataset = data;
			extractData(dataset);
			console.log(extractData(dataset));
			//console.log(extractData(dataset)[0]['Month']);
			console.log(stackData(extractData(dataset)));
			//console.log(stackData(extractData(dataset))[0][0].data);

			drawData(stackData(extractData(dataset)), bar);

		})
  })();
