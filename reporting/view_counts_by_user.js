/**
 * Prints the sum of views of all quarks created by a user.
 * 
 * $ mongo jux_dev --quiet view_counts_by_user.js
 */

var results = db.quarks.group({
    key: { user_id: true },
    cond: { deleted_at: null },
    reduce: function(obj, prev) {
		prev.view_sum += obj.views;
    },
    initial: {
    	view_sum: 0
    }
});

printjson(results);
