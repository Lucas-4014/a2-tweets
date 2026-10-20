class Tweet {
	private text:string;
	time:Date;

	constructor(tweet_text:string, tweet_time:string) {
        this.text = tweet_text;
		this.time = new Date(tweet_time);//, "ddd MMM D HH:mm:ss Z YYYY"
	}

	//returns either 'live_event', 'achievement', 'completed_event', or 'miscellaneous'
    get source():string {
        //TODO: identify whether the source is a live event, an achievement, a completed event, or miscellaneous.
        if (this.text.includes("Just completed a") || this.text.startsWith("I just completed") || this.text.startsWith("Completed a") || this.text.includes("Just posted a")) {
            return "completed_event";
        }
        else if (this.text.includes("Live") || this.text.includes("#RKLive")) {
            return "live_event";
        }
        else if (this.text.startsWith("Achieved") || this.text.startsWith("I just set a goal")) {
            return "achievement";
        }
        else {
            return "miscellaneous";
        }
    }

    //returns a boolean, whether the text includes any content written by the person tweeting.
    get written():boolean {
        //TODO: identify whether the tweet is written
        let text = this.text
        .replace(/#Runkeeper/gi, "")
        .replace(/https:\/\/t\.co\/[a-zA-Z0-9]+/gi, "")
        
        .replace(/Just completed a \d+\.\d+ (km|mi) \w+ with @Runkeeper\. Check it out!/gi, "")
        .replace(/Just completed a \d+\.\d+ (km|mi) \w+ with Runkeeper\. Check it out!/gi, "")
        .replace(/Just completed a \d+\.\d+ (km|mi) \w+ \w+ with @Runkeeper\. Check it out!/gi, "")
        .replace(/Just completed a \d+\.\d+ (km|mi) \w+ - TomTom MySports Watch/gi, "")
        .replace(/Just completed a \d+\.\d+ (km|mi) \w+ -/gi, "")
        .replace(/Just completed a \d+\.\d+ (km|mi) \w+ \w+ -/gi, "")
        .replace(/Just completed a \d+\.\d+ (km|mi) MySports Freestyle - TomTom MySports Watch/gi, "")
        
        .replace(/Just posted a \d+\.\d+ (km|mi) \w+ with @Runkeeper\. Check it out!/gi, "")
        .replace(/Just posted a \d+\.\d+ (km|mi) \w+ \w+ with @Runkeeper\. Check it out!/gi, "")
        .replace(/Just posted a \w+ in \d+:\d+  with @Runkeeper\. Check it out!/gi, "")
        .replace(/Just posted a \w+ \w+ in \d+:\d+  with @Runkeeper\. Check it out!/gi, "")
        .replace(/Just posted a \d+\.\d+ (km|mi) \w+ \w+ -/gi, "")
        .replace(/Just posted a \d+\.\d+ (km|mi) \w+ - TomTom MySports Watch/gi, "")
        .replace(/Just posted a \d+\.\d+ (km|mi) \w+ -/gi, "")
        .replace(/Just posted a \w+ \w+ in \d+:\d+:\d+  - TomTom MySports Watch/gi, "")
        .replace(/Just posted a \w+ \w+ in \d+:\d+:\d+  with @Runkeeper\. Check it out!/gi, "")
        .replace(/Just posted a \w+ in \d+:\d+:\d+  - TomTom MySports Watch/gi, "")
        .replace(/Just posted a \w+ in \d+:\d+  - TomTom MySports Watch/gi, "")
        .replace(/Just posted a \w+ \w+ in \d+:\d+  - TomTom MySports Watch/gi, "")
        .replace(/Just posted a CrossFit® workout in \d+:\d+  -/gi, "")
        .replace(/Just posted a CrossFit® workout in \d+:\d+:\d+  -/gi, "")
        .replace(/Just posted a CrossFit® workout in \d+:\d+:\d+  with @Runkeeper. Check it out!/gi, "")
        .replace(/Just posted a CrossFit® workout in \d+:\d+  with @Runkeeper. Check it out!/gi, "")
        .replace(/Just posted an \w+ \w+ in \d+:\d+  with @Runkeeper. Check it out!/gi, "")
        .replace(/Just posted an \w+ \w+ in \d+:\d+:\d+  with @Runkeeper. Check it out!/gi, "")
        .replace(/Just posted a \w+ \w+ in \d+:\d+:\d+  -/gi, "")
        .replace(/Just posted a group workout in \d+:\d+. -/gi, "")
        .replace(/Just posted a \w+ \w+ in \d+:\d+  -/g, "")
        .trim();
        // console.log(text);
        // console.log(text.length)
        if (text.length != 0) {
            return true;
        }
        else {
            return false;
        }
    }

    get writtenText():string {
        if(!this.written) {
            return "";
        }
        //TODO: parse the written text from the tweet
        let text = this.text
        .replace(/#Runkeeper/gi, "")
        .replace(/https:\/\/t\.co\/[a-zA-Z0-9]+/gi, "")
        
        .replace(/Just completed a \d+\.\d+ (km|mi) \w+ with @Runkeeper\. Check it out!/gi, "")
        .replace(/Just completed a \d+\.\d+ (km|mi) \w+ with Runkeeper\. Check it out!/gi, "")
        .replace(/Just completed a \d+\.\d+ (km|mi) \w+ \w+ with @Runkeeper\. Check it out!/gi, "")
        .replace(/Just completed a \d+\.\d+ (km|mi) \w+ - TomTom MySports Watch/gi, "")
        .replace(/Just completed a \d+\.\d+ (km|mi) \w+ -/gi, "")
        .replace(/Just completed a \d+\.\d+ (km|mi) \w+ \w+ -/gi, "")
        .replace(/Just completed a \d+\.\d+ (km|mi) MySports Freestyle - TomTom MySports Watch/gi, "")
        
        .replace(/Just posted a \d+\.\d+ (km|mi) \w+ with @Runkeeper\. Check it out!/gi, "")
        .replace(/Just posted a \d+\.\d+ (km|mi) \w+ \w+ with @Runkeeper\. Check it out!/gi, "")
        .replace(/Just posted a \w+ in \d+:\d+  with @Runkeeper\. Check it out!/gi, "")
        .replace(/Just posted a \w+ \w+ in \d+:\d+  with @Runkeeper\. Check it out!/gi, "")
        .replace(/Just posted a \d+\.\d+ (km|mi) \w+ \w+ -/gi, "")
        .replace(/Just posted a \d+\.\d+ (km|mi) \w+ - TomTom MySports Watch/gi, "")
        .replace(/Just posted a \d+\.\d+ (km|mi) \w+ -/gi, "")
        .replace(/Just posted a \w+ \w+ in \d+:\d+:\d+  - TomTom MySports Watch/gi, "")
        .replace(/Just posted a \w+ \w+ in \d+:\d+:\d+  with @Runkeeper\. Check it out!/gi, "")
        .replace(/Just posted a \w+ in \d+:\d+:\d+  - TomTom MySports Watch/gi, "")
        .replace(/Just posted a \w+ in \d+:\d+  - TomTom MySports Watch/gi, "")
        .replace(/Just posted a \w+ \w+ in \d+:\d+  - TomTom MySports Watch/gi, "")
        .replace(/Just posted a CrossFit® workout in \d+:\d+  -/gi, "")
        .replace(/Just posted a CrossFit® workout in \d+:\d+:\d+  -/gi, "")
        .replace(/Just posted a CrossFit® workout in \d+:\d+:\d+  with @Runkeeper. Check it out!/gi, "")
        .replace(/Just posted a CrossFit® workout in \d+:\d+  with @Runkeeper. Check it out!/gi, "")
        .replace(/Just posted an \w+ \w+ in \d+:\d+  with @Runkeeper. Check it out!/gi, "")
        .replace(/Just posted an \w+ \w+ in \d+:\d+:\d+  with @Runkeeper. Check it out!/gi, "")
        .replace(/Just posted a \w+ \w+ in \d+:\d+:\d+  -/gi, "")
        .replace(/Just posted a group workout in \d+:\d+. -/gi, "")
        .replace(/Just posted a \w+ \w+ in \d+:\d+  -/g, "")
        .trim();
        return text;
    }

    get activityType():string {
        if (this.source != 'completed_event') {
            return "unknown";
        }
        //TODO: parse the activity type from the text of the tweet
        return "";
    }

    get distance():number {
        if(this.source != 'completed_event') {
            return 0;
        }
        //TODO: prase the distance from the text of the tweet
        return 0;
    }

    getHTMLTableRow(rowNumber:number):string {
        //TODO: return a table row which summarizes the tweet with a clickable link to the RunKeeper activity
        return "<tr></tr>";
    }
}