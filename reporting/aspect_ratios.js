/**
 * Prints the aspect ratio distribution of Pictures.
 * 
 * $ mongo jux_dev --quiet aspect_ratios.js
 */

var results = db.assets.group({
	cond: { '_type': 'Picture' },
	keyf: function(doc){
		var aspectRatio;
		if (doc.width && doc.height){
			aspectRatio = doc.width / doc.height;
			aspectRatio = aspectRatio.toFixed(1);
		} else {
			aspectRatio = 'unknown';
		}

		return { aspectRatio: aspectRatio };
	},
	initial: {
		count: 0
	},
	reduce: function(doc, out) {
		out.count++;
	}
});

printjson(results);
