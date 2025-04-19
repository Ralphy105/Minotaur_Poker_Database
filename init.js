require('module-alias/register');
require('dotenv').config();
const { dbConnect } = require('@m/init.js');

module.exports = dbConnect;