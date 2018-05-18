const https = require('https');
const url = require('url');

const CLIP_URL = 'https://clips.twitch.tv/twitch/';

var clip = function(broadcasterId, authKey, completeCb) {
	const options = {
	  hostname: 'api.twitch.tv',
	  path: '/helix/clips?broadcaster_id=' + broadcasterId,
	  method: 'POST',
	  headers: {
	    'Authorization: Bearer': authKey,
	  }
	};
	https.request(options, (res) => {
		res.on('data', (d) => {
			var clipId = data['data'][0]['id'];
			var editUrl = data['data'][0]['edit_url'];
			completeCb(CLIP_URL + clipId, editUrl);
		});
	});
};

module.exports = {
	clip: clip
};
