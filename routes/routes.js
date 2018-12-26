const user = require('./user.js');
const users = require('./users.js');

const appRouter = (app) => {
	app.get('/', (req, res) =>
		res.status(200).send({message: 'Welcome to REST.'})
	);

	user(app);
	users(app);
};

module.exports = appRouter;
