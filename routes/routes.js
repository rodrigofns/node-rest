var appRouter = function(app) {
	app.get('/', function(req, res) {
		res.status(200).send({ message: 'Welcome to REST.' });
	});

	app.get('/user', function(req, res) {
		var data = {
			firstName: 'John',
			lastName: 'Doe',
			email: 'john@doe.com'
		};
		res.status(200).send(data);
	});

	app.get('/users/:num', function(req, res) {
		var users = [];
		var num = req.params.num;

		if (isFinite(num) && num > 0) {
			users.push({
				id: num,
				firstName: 'John',
				lastName: 'Doe',
				email: 'john@doe.com'
			});
			res.status(200).send(users);
		} else {
			res.status(400).send({ message: 'Invalid number supplied.' });
		}
	});
};

module.exports = appRouter;
