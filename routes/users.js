const users = (app) => {
	app.get('/users/:num', (req, res) => {
		const num = req.params.num; // users/xxx

		if (isFinite(num) && num > 0) {
			users.push({
				id: num,
				firstName: 'John',
				lastName: 'Doe',
				email: 'john@doe.com'
			});
			res.status(200).send(users);
		} else {
			res.status(400).send({message: 'Invalid number supplied.'});
		}
	});
};

module.exports = users;
