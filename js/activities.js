function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}
	
	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});

	//TODO: create a new array or manipulate tweet_array to create a graph of the number of tweets containing each type of activity.
	activity_array = tweet_array.map(function(tweet) {
		return {"activityType": tweet.activityType, "distance": tweet.distance, "time (day)": tweet.time.toLocaleDateString('en-US', {weekday: "short"})};
	});

	const activityMap = new Map();
	
	let a1 = 0;
	let a2 = 0;
	let a3 = 0;
	let a1Type = "";
	let a2Type = "";
	let a3Type = "";

	let longestDistance = activity_array[0].distance;
	let shortestDistance = activity_array[0].distance;
	let lgType = "";
	let shType = "";

	let weekdaySum = 0;
	let weekendSum = 0;
	let weekdayCount = 0;
	let weekendCount = 0;
	
	var runActivityArray = function(activity) {
		let type = activity.activityType;
		if (!activityMap.has(type) && type != "unknown") {
			activityMap.set(type, 1);
		}
		else if (activityMap.has(type) && type != "unknown") {
			const currentCount = activityMap.get(type);
			activityMap.set(type, currentCount + 1);
		}		
	}
	activity_array.forEach(runActivityArray);
	
	for (const [type, count] of activityMap) {
		if (a1 < count) {
			a3 = a2;
			a2 = a1;
			a1 = count;

			a3Type = a2Type;
			a2Type = a1Type;
			a1Type = type;
		}
		else if (a2 < count) {
			a3 = a2;
			a2 = count;

			a3Type = a2Type;
			a2Type = type;
		}
		else if (a3 < count) {
			a3 = count;

			a3Type = type;
		}
	}

	var runLongestAndShortest = function(activity) {
		let type = activity.activityType;
		let distance = activity.distance;
		if (type === a1Type || type === a2Type || type === a3Type) {
			if (longestDistance < distance) {
				longestDistance = distance;
				lgType = type;
			}
			if (shortestDistance > distance) {
				shortestDistance = distance;
				shType = type;
			}
		}
	}
	activity_array.forEach(runLongestAndShortest);

	var runWeekdaysOrWeekends = function(activity) {
		let type = activity.activityType;
		let day = activity["time (day)"];
		if (type === lgType) {
			if (day === "Sun" || day === "Sat") {
				weekendSum += activity.distance;
				weekendCount += 1;
			}
			else {
				weekdaySum += activity.distance;
				weekdayCount += 1;
			}
		}
	}
	activity_array.forEach(runWeekdaysOrWeekends);

	let weekdaysOrWeekends = "";
	let weekendAverage = Number((weekendSum/weekendCount).toFixed(2));
	let weekdayAverage = Number((weekdaySum/weekdayCount).toFixed(2));
	
	if (weekendAverage > weekdayAverage) {
		weekdaysOrWeekends = "weekends";
	}
	else if (weekdayAverage > weekendAverage) {
		weekdaysOrWeekends = "weekdays";
	}

	const numberActivities = activityMap.size;
	document.getElementById("numberActivities").innerText = numberActivities;
	
	document.getElementById("firstMost").innerText = a1Type;
	document.getElementById("secondMost").innerText = a2Type;
	document.getElementById("thirdMost").innerText = a3Type;

	document.getElementById("longestActivityType").innerText = lgType;
	document.getElementById("shortestActivityType").innerText = shType;

	document.getElementById("weekdayOrWeekendLonger").innerText = weekdaysOrWeekends;
	
	const graph1_array = [];

	for (const [key, value] of activityMap) {
		graph1_array.push({"activity (type)": key, "total": value});
	}
	
	activity_vis_spec = {
	  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
	  "description": "A graph of the number of Tweets containing each type of activity.",
	  "data": {
		"values": graph1_array
		},
	  //TODO: Add mark and encoding
	  "mark": "bar",
	  "encoding": {
		"x": {"field": "total", "type": "quantitative"},
		"y": {"field": "activity (type)", "type": "nominal"}
	}
	};
	vegaEmbed('#activityVis', activity_vis_spec, {actions:false});

	//TODO: create the visualizations which group the three most-tweeted activities by the day of the week.
	//Use those visualizations to answer the questions about which activities tended to be longest and when.
	const top_three_activities_array = [];
	let isAggregated = false;

	var runTopThreeActivities = function(activity) {
		const type = activity.activityType;
		const day = activity["time (day)"];
		const distance = activity.distance;
		
		if (a1Type === type || a2Type === type || a3Type === type) {
			top_three_activities_array.push({"activityType": type, "time (day)": day, "distance": distance});
		}
	}
	activity_array.forEach(runTopThreeActivities);

	distance_vis_spec = {
		"data": {
			"values": top_three_activities_array
		},
		"mark": "point",
		"encoding": {
			"x": {"field": "time (day)", "type": "ordinal", "sort": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]},
			"y": {"field": "distance", "type": "quantitative"},
			"color": {"field": "activityType", "type": "nominal"}
		}
	};
	vegaEmbed('#distanceVisAggregated', distance_vis_spec, {actions:false});

	distance_vis_aggregated_spec = {
		"data": {
			"values": top_three_activities_array
		},
		"mark": "point",
		"encoding": {
			"x": {"field": "time (day)", "type": "ordinal", "sort": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]},
			"y": {"field": "distance", "type": "quantitative", "aggregate": "mean"},
			"color": {"field": "activityType", "type": "nominal"}
		}
	};

	document.getElementById("aggregate").addEventListener('click', function() {
		if (isAggregated === false) {
			vegaEmbed('#distanceVisAggregated', distance_vis_aggregated_spec, {actions:false});
			document.getElementById("aggregate").textContent = "Show all activities";
		}
		else {
			vegaEmbed('#distanceVisAggregated', distance_vis_spec, {actions:false});
			document.getElementById("aggregate").textContent = "Show means";	
		}
		isAggregated = !isAggregated;
	});
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});