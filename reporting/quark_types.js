/**
 * Prints the aspect ratio distribution of Pictures.
 * 
 * $ mongo jux_dev --quiet quark_types.js
 */

var results = db.quarks.group({
	cond: { deleted_at: null },
	key: { _type: true },
	initial: {
		count: 0
	},
	reduce: function(doc, out) {
		out.count++;
	}
});

printjson(results);
