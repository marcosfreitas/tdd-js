/**
 * tests those do not have side effects. Just do singular things.
 */
const bcrypt = require('bcryptjs');

const { user } = require('../../app/models')
const truncate = require('./../utils/truncate');


describe('User', () => {

    beforeEach(async () => {
        await truncate();
    });

    it ('should encrypt user password', async () => {
        const created = await user.create(
            {
                name: 'Gunter',
                email: 'gunter@getnada.com',
                password: '123'
            }
        )

        const compareHash = await created.checkPassword('123');

        expect(compareHash).toBe(true);
    });

});
