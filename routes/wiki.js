const axios = require('axios');

const wiki = (app) => {
	app.get('/wiki/:s', (req, res) => {
		const search = req.params.s;
		const url = 'https://en.wikipedia.org/w/api.php'
			+ '?action=query&prop=extracts&format=json&exintro=&titles=' + search;

		axios.get(url)
			.then(resp => {
				res.status(200).send({
					searched: resp.data.query.normalized,
					found: resp.data.query.pages
				});
			})
			.catch(err => {
				res.status(400).send(err);
			});
	});
};

module.exports = wiki;
