var classify  = function(d) {
			for (i=0; i<d.length; i++){
				if (parseInt(d[i].Index) == 0) {
					set0.push({
						Month : dataset[i].Month,
						Count : dataset[i].Count
					})
				} else if (parseInt(d[i].Index) == 1) {
					set1.push({
						Month : dataset[i].Month,
						Count : dataset[i].Count
					})
				} else if(parseInt(d[i].Index) == 2) {
					set2.push({
						Month : dataset[i].Month,
						Count : dataset[i].Count
					})
				} else if (parseInt(d[i].Index) == 3) {
					set3.push({
						Month : dataset[i].Month,
						Count : dataset[i].Count
					})
				} else { continue;}
			}
		}

