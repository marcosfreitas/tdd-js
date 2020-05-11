const bcrypt  = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.VIRTUAL,
        password_hash: DataTypes.STRING
    }, {
        hooks: {
            beforeSave: async creating => {
                if (creating.password) {
                    creating.password_hash = await bcrypt.hash(creating.password, 8)
                }
            }
        }
    });

    User.prototype.checkPassword = function(password) {
        return bcrypt.compare(password, this.password_hash);

    }

    User.prototype.generateToken = function() {
        return jwt.sign(
            {
                id: this.id
            },
            process.env.APP_SECRET
        );
    }

    return User;
};