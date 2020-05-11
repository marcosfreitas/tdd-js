const { user } = require('../models');

class SessionController {

    async store(req, res) {

        const { email, password } = req.body;

        const found = await user.findOne({
            where: { email }
        });

        if (!found) {
            return res.status(401).json({
                message: 'User not found'
            })
        }

        if (!(await found.checkPassword(password))) {
            return res.status(401).json({
                message:'incorrect password'
            });
        }

        return res.json({
            user: found,
            token: found.generateToken()
        });
    }

}

module.exports = new SessionController();