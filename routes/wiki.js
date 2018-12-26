const axios = require('axios');

const wiki = (app) => {
	function queryWiki(response, params, onDone) {
		axios.get('https://en.wikipedia.org/w/api.php', {params})
			.then(resp => onDone(resp.data))
			.catch(err => response.status(400).send(err));
	}

	app.get('/wiki/head/:s', (request, response) => {
		const params = {
			action: 'query',
			prop: 'extracts',
			format: 'json',
			exintro: '',
			titles: request.params.s
		};

		queryWiki(response, params,
			data => {
				response.status(200).send({
					searched: data.query.normalized,
					found: data.query.pages
				});
			});
	});

	app.get('/wiki/full/:s', (request, response) => {
		const params = {
			action: 'query',
			prop: 'revisions',
			rvprop: 'content',
			format: 'json',
			titles: request.params.s
		};

		queryWiki(response, params,
			data => {
				const pageid = Object.keys(data.query.pages)[0];
				const page = data.query.pages[pageid];
				let out = {
					searched: data.query.normalized[0]
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
	});
};

module.exports = wiki;
