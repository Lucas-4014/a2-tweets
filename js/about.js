function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});
	
	//This line modifies the DOM, searching for the tag with the numberTweets ID and updating the text.
	//It works correctly, your task is to update the text of the other tags in the HTML file!
	document.getElementById('numberTweets').innerText = tweet_array.length;

	//Tweet Dates
	let firstDate = null;
	let lastDate = null;

	var runTweetDates = function(tweet) {
		currentDate = tweet.time;
		
		if (firstDate === null || firstDate > currentDate) {
			firstDate = currentDate;
		}
		if (lastDate === null || lastDate < currentDate) {
			lastDate = currentDate;
		}
	}
	tweet_array.forEach(runTweetDates);

	firstDate = firstDate.toLocaleDateString('en-US', {weekday:'long', month:'long', day:'numeric', year:'numeric'});
	lastDate = lastDate.toLocaleDateString('en-US', {weekday:'long', month:'long', day:'numeric', year:'numeric'});

	document.getElementById('firstDate').innerText = firstDate;
	document.getElementById('lastDate').innerText = lastDate;

	//Tweet Categories
	let completedEvents = 0;
	let liveEvents = 0;
	let achievements = 0;
	let miscellaneous = 0;

	var runTweetCategories = function(tweet) {
		// console.log(tweet.text);
		if (tweet.source === "completed_event") {
			// console.log(tweet.text);
			completedEvents += 1;
		}
		else if (tweet.source === "live_event") {
			// console.log(tweet.text);
			liveEvents += 1;
		}
		else if (tweet.source === "achievement") {
			// console.log(tweet.text);
			achievements += 1;
		}
		else if (tweet.source === "miscellaneous") {
			// console.log(tweet.text);
			miscellaneous += 1;
		}
	}
	tweet_array.forEach(runTweetCategories);


	const completedEventsElements = document.querySelectorAll(".completedEvents");
	var runCompletedEvents = function (text) {
		text.textContent = completedEvents;
	}
	completedEventsElements.forEach(runCompletedEvents);


	// document.querySelector(".completedEvents").textContent = completedEvents;
	document.querySelector(".liveEvents").textContent = liveEvents;
	document.querySelector(".achievements").textContent = achievements;
	document.querySelector(".miscellaneous").textContent = miscellaneous;

	const numberOfTweets = tweet_array.length;
	const completedEventsPct = ((completedEvents / numberOfTweets) * 100).toFixed(2);
	const liveEventsPct = ((liveEvents / numberOfTweets) * 100).toFixed(2);
	const achievementsPct = ((achievements / numberOfTweets) * 100).toFixed(2);
	const miscellaneousPct = ((miscellaneous / numberOfTweets) * 100).toFixed(2);

	document.querySelector(".completedEventsPct").textContent = completedEventsPct + "%";
	document.querySelector(".liveEventsPct").textContent = liveEventsPct + "%";
	document.querySelector(".achievementsPct").textContent = achievementsPct + "%";
	document.querySelector(".miscellaneousPct").textContent = miscellaneousPct + "%";

	//User-Written Tweets
	let written = 0;

	var runUserWrittenTweets = function(tweet) {
		if (tweet.source === "completed_event" && tweet.written) {
			written += 1;
		}
	}
	tweet_array.forEach(runUserWrittenTweets);

	document.querySelector(".written").textContent = written;

	const writtenPct = ((written / completedEvents) * 100).toFixed(2);
	document.querySelector(".writtenPct").textContent = writtenPct + "%";
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});