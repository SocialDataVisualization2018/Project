//Width and height
			var w = 800;
			var h = 600;
			var padding = 40;
			var margins = 40;
			var Year = [];
			var tempData;

			var dataset, xScale, yScale, xAxis, yAxis, line;  //Empty, for now


			//Function for converting CSV values from strings to Dates and numbers
			var rowConverter = function(d) {
				return {
					date: parseInt(+d.Year),  //Make a new Date object for each year
					Time: parseInt(+d.Time),  //Convert from string to float
					Sex: d.Sex
				};
			}

			//Load in data
			d3.csv("men-and-women-bis-xlsx.csv", rowConverter, function(data) {
			  dataset = data;
			  tempData = dataset.filter(function(d){
			    return d.Sex == "F";
			  })
			  Year = tempData.map(d => d.Time);

				//Create scale functions
				xScale = d3.scaleLinear()
							   .domain([
									d3.min(tempData, function(d) { return d.date; }),
									d3.max(tempData, function(d) { return d.date; })
								])
							   .range([padding,w]);

				yScale = d3.scaleLinear()
                    .domain([
                      d3.min(tempData, function(d) { return d.Time;}),
                      d3.max(tempData, function(d) { return d.Time; })
                    ])
                    .range([h - padding, padding]);
				//Define X axes
				xAxis = d3.axisBottom()
						   .scale(xScale)
						   .ticks(10)
						   .tickFormat(d3.format("d"));

				//Define Y axis
				yAxis = d3.axisLeft()
						   .scale(yScale)
						   .ticks(10);

				//Define line generator
				line = d3.line()
							.x(function(d) { return xScale(d.date); })
							.y(function(d) { return yScale(d.Time); });

				//Create SVG element
				var svg = d3.select("#two")
							.append("svg")
							.attr("width", w)
							.attr("height", h);


				//Create line
				svg.append("path")
					.datum(tempData)
					.attr("class", "line")
					.attr("d", line);

				//Create axes
				svg.append("g")
					.attr("class", "x axis")
					.attr("transform", "translate(0," + (h - padding) + ")")
					.call(xAxis);

				svg.append("g")
					.attr("class", "y axis")
					.attr("transform", "translate(" + padding + ",0)")
					.call(yAxis);		    


				svg.append("text")
		            .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
		            .attr("transform", "translate("+ (padding/4) +","+(h/2)+")rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate
		            .text("Time (min)");

  				svg.append("text")
		            .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
		            .attr("transform", "translate("+ (w/2) +","+(h-(padding/4))+")")  // centre below axis
		            .text("Year");


			  	//On click, update with new data  -------------------------
			  	d3.selectAll("li")
			  	.on("click", function() {

			    //See which p was clicked
			    var paragraphID = d3.select(this).attr("id");

			    //Decide what to do next
			    if (paragraphID == "f_h") {
			      tempData = dataset.filter(function(d){
			        return d.Sex == "M";
			      })
			    }

					//console.log(tempData)

			    if (paragraphID == "f_s") {
			      tempData = dataset.filter(function(d){
			        return d.Sex == "F";
			      });
			    }

			    if (paragraphID == "f_h&s") {
			      tempData = dataset.filter(function(d){
			        return d.Sex;
			      });
			    }


			    //Update scale domains
			    yScale.domain([d3.min(tempData, function(d) {return d.Time;}), d3.max(tempData, function(d) {return d.Time;})])
			    .range([h-padding, padding]);
					xScale.domain([d3.min(tempData, function(d) {return d.date;}), d3.max(tempData, function(d) {return d.date;})]);

					// Select the section we want to apply our changes to
    			var svg = d3.select("body").transition();

    // Make the changes
        	svg.select(".line")   // change the line
            .duration(750)
            .attr("d", line(tempData));
        	svg.select(".x.axis")
						.transition() // change the x axis
            .duration(750)
            .call(xAxis);
        	svg.select(".y.axis") // change the y axis
						.transition()
						.duration(750)
            .call(yAxis);

			    //Update Y axis
			 /*   svg.select(".y.axis")
			        .transition()
			        .duration(1000)
			      .call(yAxis);*/

			  });


						});
