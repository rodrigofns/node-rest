const user = (app) => {
	app.get('/user', (req, res) => {
		const theName = req.query.name || '(untyped)'; // ?name=xxx

		const data = {
			firstName: 'John',
			lastName: 'Doe',
			email: 'john@doe.com',
			yourName: theName
		};
		res.status(200).send(data);
	});
};

module.exports = user;
