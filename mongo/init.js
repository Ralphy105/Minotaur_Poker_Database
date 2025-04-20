const mongoose = require('mongoose');

async function dbConnect() {

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

        return db;
    } catch (err) {
        console.error(err);
        return false;
    }
}

async function dbDisconnect() {
    try {
        await mongoose.disconnect();
    } catch (err) {
        console.error('Error disconnecting from MongoDB:', err);
    }
}

module.exports = {
    dbConnect,
    dbDisconnect,
};