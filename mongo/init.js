const mongoose = require('mongoose');

const connection = {};

async function dbConnect() {
    if (connection.isConnected) return true;

    try {
        let timeout;
        const db = await Promise.race([
            // Database connection attempt
            mongoose.connect(process.env.MONGO_URI),
            // Timeout after 10 seconds
            new Promise((_, reject) => {
                timeout = setTimeout(() => reject(new Error('DB connection timed out')), 5000).unref();
            }),
        ]);
        clearTimeout(timeout); // In case mongoose.connect resolves before the timeout

        connection.isConnected = db.connections[0].readyState;
        return connection.isConnected == 1;
    } catch (err) {
        console.error(err);
        return false;
    }
}

module.exports = {
    dbConnect,
};