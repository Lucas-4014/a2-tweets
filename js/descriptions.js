let writtenTweets = []

function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	//TODO: Filter to just the written tweets
	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});

	var runTweet = function(tweet) {
		if (tweet.written) {
			writtenTweets.push(tweet);
		}
	}
	tweet_array.forEach(runTweet);
}

function addEventHandlerForSearch() {
	//TODO: Search the written tweets as text is entered into the search box, and add them to the table
	document.getElementById("searchCount").innerText = "0";
	document.getElementById("searchText").innerText = '';

	document.getElementById("textFilter").addEventListener('input', function(event) {
		let searchText = event.target.value;
		let searchTextLC = event.target.value.toLowerCase();

		let searchCount = 0;

		document.getElementById("tweetTable").innerHTML = '';

		var runTweetDescriptions = function(tweet) {
			if (tweet.text.toLowerCase().includes(searchTextLC)) {
				searchCount += 1;

				const row = document.getElementById("tweetTable").insertRow();
				row.innerHTML = tweet.getHTMLTableRow(searchCount);
			}
		}
		writtenTweets.forEach(runTweetDescriptions);

		if (searchText === '') {
			searchCount = 0;
			document.getElementById("tweetTable").innerHTML = '';
		}

		document.getElementById("searchCount").innerText = searchCount;
		document.getElementById("searchText").innerText = searchText;
	});
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	addEventHandlerForSearch();
	loadSavedRunkeeperTweets().then(parseTweets);
});