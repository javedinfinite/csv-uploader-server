const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define('employee', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		name: {
			allowNull: false,
			type: DataTypes.STRING,
			unique: false,
			validate: {
				is: /[\s\w]{2,}/
			}
		},
		reportingManager: {
			allowNull: false,
			type: DataTypes.STRING,
			validate: {
				is: /[\s\w]{3,}/
			}
		},
        salary: {
			allowNull: false,
			type: DataTypes.NUMBER,
			validate: {
				is: /[\s\w]{1,}/
			}
		},
		age: {
			allowNull: true,
			type: DataTypes.NUMBER,
			validate: {
				is: /[\s\w]{1,}/
			}
		},
        dateOfBirth: {
			allowNull: true,
			type: DataTypes.STRING,  //DataTypes.DATEONLY,
            // validate: {
            //      isDate: true
            // }
		},
		department: {
			allowNull: false,
			type: DataTypes.STRING,
			unique: false,
			validate: {
				is: /[\s\w]{1,}/
			}
		}
	});
};