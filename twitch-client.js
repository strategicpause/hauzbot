const request = require('request');
const url = require('url');

const CLIP_URL = 'https://clips.twitch.tv/';

const clip = function(broadcasterId, authKey, onSuccess) {
	const options = {
	  url: 'https://api.twitch.tv/helix/clips?broadcaster_id=' + broadcasterId,
	  headers: {
	    'Authorization': 'Bearer ' + authKey,
	  }
	};
	request.post(options, (err, response, body) => {
		if (!err) {
			const parsedBody = JSON.parse(body);
			if (!parsedBody.error) {
				const clipId = parsedBody['data'][0]['id'];
				const editUrl = parsedBody['data'][0]['edit_url'];
				onSuccess(CLIP_URL + clipId, editUrl);
			} else {
				console.log(parsedBody);
			}
		} else {
			console.log(err);
		}
	});
};

module.exports = {
	clip: clip
};
