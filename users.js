// grab db
const low = require('lowdb');
// instantiate db
const db = low('./db.json');

// default
db.defaults({
	places: [], 
	locations: [], 
	users: [],
	user_locations: [],
}).write();

// Places manager object
const Users = {};

Users.createNewUser = (email, name, password) => {
	if (!email || !name || !password) {
		return false;
	}
	
	db.get('users')
		.push({
			email,
			name,
			password
		})
		.write();

	return true;
}

module.exports = Users;

