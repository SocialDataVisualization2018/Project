//Width and height
			var w = 800;
			var h = 300;
			var padding = 40;

			var dataset, xScale, yScale, xAxis, yAxis, line;  //Empty, for now


			//Function for converting CSV values from strings to Dates and numbers
			var rowConverter = function(d) {
				return {
					date: parseInt(+d.Year),  //Make a new Date object for each year
					time: parseFloat(d.time)  //Convert from string to float
				};
			}

			//Load in data
			d3.csv("men-xlsx.csv", rowConverter, function(data) {

				var dataset = data;

				//Print data to console as table, for verification
				//console.table(dataset, ["date", "average"]);

				//Create scale functions
				xScale = d3.scaleLinear()
							   .domain([
									d3.min(dataset, function(d) { return d.date; }),
									d3.max(dataset, function(d) { return d.date; })
								])
							   .range([padding, w]);

				yScale = d3.scaleLinear()
                    .domain([
                      d3.min(dataset, function(d) { return d.time}),
                      d3.max(dataset, function(d) { return d.time; })
                    ])
                    .range([h - padding, 0]);
				//Define axes
				console.log("Gunnar")
				console.log(d.date)
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
							.y(function(d) { return yScale(d.time); });

				//Create SVG element
				var svg = d3.select("#two")
							.append("svg")
							.attr("width", w)
							.attr("height", h);


				//Create line
				svg.append("path")
					.datum(dataset)
					.attr("class", "line")
					.attr("d", line);

				//Create axes
				svg.append("g")
					.attr("class", "axis")
					.attr("transform", "translate(0," + (h - padding) + ")")
					.call(xAxis);

				svg.append("g")
					.attr("class", "axis")
					.attr("transform", "translate(" + padding + ",0)")
					.call(yAxis);

				d3.selectAll("li")

			});


