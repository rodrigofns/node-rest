const axios = require('axios');

const wiki = (app) => {
	app.get('/wiki/:s', (req, res) => {
		const search = req.params.s;

		axios.get('https://en.wikipedia.org/w/api.php', {
			params: {
				action: 'query',
				prop: 'extracts',
				format: 'json',
				exintro: '',
				titles: search
			}
		}).then(resp => {
			res.status(200).send({
				searched: resp.data.query.normalized,
				found: resp.data.query.pages
			});
		}).catch(err => {
			res.status(400).send(err);
		});

	});
};

module.exports = wiki;
