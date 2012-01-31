/**
 * Prints the aspect ratio distribution of Pictures.
 * 
 * $ mongo jux_dev --quiet image_sizes.js
 */

var bucketSize = 1000;

var results = db.assets.group({
	cond: { '_type': 'Picture' },
	keyf: function(doc){
		var mp;
		if (doc.width && doc.height){
			mp = doc.width * doc.height;
			mp = Math.round(mp / 1000000) + 1; // round up
		} else {
			mp = 'unknown';
		}

		return { megapixels: mp };
	},
	initial: {
		count: 0
	},
	reduce: function(doc, out){
		out.count++;
	}
});

results.sort(function(a, b){
	return a.megapixels - b.megapixels;
});

printjson(results);
