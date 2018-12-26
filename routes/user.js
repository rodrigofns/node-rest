const user = (req, res) => {
	const data = {
		firstName: 'John',
		lastName: 'Doe',
		email: 'john@doe.com'
	};
	res.status(200).send(data);
};

module.exports = user;
