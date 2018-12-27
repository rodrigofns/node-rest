const axios = require('axios');

const wiki = (app) => {
	const WIKI_URL = 'https://en.wikipedia.org/w/api.php';

	app.get('/wiki/head/:s', async (request, response) => {
		const params = {
			action: 'query',
			prop: 'extracts',
			format: 'json',
			exintro: '',
			titles: request.params.s
		};

		let r = null;
		try {
			r = await axios.get(WIKI_URL, {params});
		} catch (err) {
			response.status(400).send(err);
		}

		response.status(200).send({
			searched: r.data.query.normalized,
			found: r.data.query.pages
		});
	});

	app.get('/wiki/full/:s', async (request, response) => {
		const params = {
			action: 'query',
			prop: 'revisions',
			rvprop: 'content',
			format: 'json',
			titles: request.params.s
		};

		let r = null;
		try {
			r = await axios.get(WIKI_URL, {params});
		} catch (err) {
			response.status(400).send(err);
		}

		const pageid = Object.keys(r.data.query.pages)[0];
		const page = r.data.query.pages[pageid];
		let out = {
			searched: r.data.query.normalized[0]
		};

		if (pageid == -1) {
			out = {
				...out,
				status: 'missing (pageid: -1)'
			};
		} else {
			const bulk = page.revisions[0];
			out = {
				...out,
				found: {
					pageid: page.pageid,
					title: page.title,
					format: bulk.contentformat,
					contentmodel: bulk.contentmodel,
					body: bulk['*']
				}
			};
		}

		response.status(200).send(out);
	});
};

module.exports = wiki;
