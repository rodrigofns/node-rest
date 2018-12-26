const user = require('./user.js');
const users = require('./users.js');

const appRouter = (app) => {
	app.get('/', (req, res) =>
		res.status(200).send({message: 'Welcome to REST.'})
	);

	app.get('/user', user);
	app.get('/users/:num', users);
};

module.exports = appRouter;
