require('dotenv').config();
const { dbConnect } = require('./mongo/init.js');
const fs = require('node:fs');
const path = require('node:path');

const endpointsPath = path.join(__dirname, 'endpoints');
const endpoints = fs.readdirSync(endpointsPath).filter(file => file.endsWith('.js'));

(async () => {
    await dbConnect();

    console.log('MongoDB connected successfully!');
})();