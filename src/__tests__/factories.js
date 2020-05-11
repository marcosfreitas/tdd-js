const faker = require('faker');
const { factory } = require('factory-girl');
const { user } = require('../app/models');

factory.define('User', user, {
    name: faker.name.findName,
    email: faker.internet.exampleEmail,
    password: faker.password
});

module.exports = factory;