const axios = require('axios');

const wiki = (app) => {
	function queryWiki(req, res, parms, onDone) {
		axios.get('https://en.wikipedia.org/w/api.php', {
			params: {
				...parms
			}
		}).then(resp => {
			onDone(resp.data);
		}).catch(err => {
			res.status(400).send(err);
		});
	}

	app.get('/wiki/head/:s', (req, res) => {
		const parms = {
			action: 'query',
			prop: 'extracts',
			format: 'json',
			exintro: '',
			titles: req.params.s
		};

		queryWiki(req, res, parms,
			data => {
				res.status(200).send({
					searched: data.query.normalized,
					found: data.query.pages
				});
			});
	});

	app.get('/wiki/full/:s', (req, res) => {
		const parms = {
			action: 'query',
			prop: 'revisions',
			rvprop: 'content',
			format: 'json',
			titles: req.params.s
		};

		queryWiki(req, res, parms,
			data => {
				const page = data.query.pages[ Object.keys(data.query.pages)[0] ];
				const bulk = page.revisions[0];

				res.status(200).send({
					searched: data.query.normalized[0],
					found: {
						pageid: page.pageid,
						title: page.title,
						format: bulk.contentformat,
						contentmodel: bulk.contentmodel,
						body: bulk['*']
					}
				});
			});
	});
};

module.exports = wiki;
