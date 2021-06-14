const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
	dialect: 'sqlite',
	storage: 'db.sqlite',
	logQueryParameters: true,
	benchmark: true
});

const modelDefiners = [
	require('./models/employee.model'),
];

for (const modelDefiner of modelDefiners) {
	modelDefiner(sequelize);
}

sequelize.sync();

module.exports = sequelize;