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

	var runTweets = function(tweet) {
		currentDate = tweet.time;
		
		if (firstDate === null || firstDate > currentDate) {
			firstDate = currentDate;
		}
		if (lastDate === null || lastDate < currentDate) {
			lastDate = currentDate;
		}
		console.log(tweet);
	}
	tweet_array.forEach(runTweets);

	firstDate = firstDate.toLocaleDateString('en-US', {weekday:'long', month:'long', day:'numeric', year:'numeric'});
	lastDate = lastDate.toLocaleDateString('en-US', {weekday:'long', month:'long', day:'numeric', year:'numeric'});

	document.getElementById('firstDate').innerText = firstDate;
	document.getElementById('lastDate').innerText = lastDate;

	//Tweet Categories

}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});