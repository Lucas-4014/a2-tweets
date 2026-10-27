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

    private parseWrittenText():string {
        let parsedText = this.text
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
        
        return parsedText;
    }

    //returns a boolean, whether the text includes any content written by the person tweeting.
    get written():boolean {
        //TODO: identify whether the tweet is written
        if (this.parseWrittenText().length != 0) {
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
        return this.parseWrittenText();
    }

    get activityType():string {
        if (this.source != 'completed_event') {
            return "unknown";
        }
        //TODO: parse the activity type from the text of the tweet
        let activityAndDistanceArray = this.text.match(/\d+.\d+\s*(mi|km)\s+[a-zA-Z]+/);
        let activityAndDistance;
        
        if (activityAndDistanceArray != null) {
            activityAndDistance = activityAndDistanceArray[0].split(" ");
            if (activityAndDistance.length === 2) {
                activityAndDistance = activityAndDistanceArray[0].replace(/(\d+.\d+)(mi|km)/, "$1 $2").split(" ");
            }

            const activity:string = activityAndDistance[2].toLowerCase();
            
            if (activity === "nordic") {
                return "nordic walk";
            }
            else if (activity === "chair") {
                return "chair ride";
            }
            else if (activity === "elliptical") {
                return "elliptical workout";
            }
            else if (activity === "mtn") {
                return "mtn bike";
            }
            else if (activity === "mysports") {
                return "MySports Freestyle";
            }
            else if (activity === "ski") {
                return "ski run";
            }
            else if (activity === "circuit") {
                return "circuit workout";
            }
            
            return activity;
        }
        else {
            return "unknown";
        }
    }

    get distance():number {
        if(this.source != 'completed_event') {
            return 0;
        }
        //TODO: parse the distance from the text of the tweet
        let activityAndDistanceArray = this.text.match(/\d+.\d+\s*(mi|km)\s+[a-zA-Z]+/);
        let activityAndDistance;
        
        if (activityAndDistanceArray != null) {
            activityAndDistance = activityAndDistanceArray[0].split(" ");
            if (activityAndDistance.length === 2) {
                activityAndDistance = activityAndDistanceArray[0].replace(/(\d+.\d+)(mi|km)/, "$1 $2").split(" ");
            }

            const distanceNumber: number = Number(activityAndDistance[0]);
            const distanceType: string = activityAndDistance[1].toLowerCase();
            if (distanceType === "km") {
                return Number((distanceNumber/1.609).toFixed(2));
            }
            else {
               return distanceNumber; 
            }
        }
        return 0;
    }

    getHTMLTableRow(rowNumber:number):string {
        //TODO: return a table row which summarizes the tweet with a clickable link to the RunKeeper activity        
        const textWithLink = this.text.replace(/(https?:\/\/\S+)/g, `<a href="$1"> $1 </a>`);
        
        return `<tr> 
        <td> ${rowNumber} </td> 
        <td> ${this.activityType} </td>
        <td> ${textWithLink} </td>
        </tr>`;
    }
}