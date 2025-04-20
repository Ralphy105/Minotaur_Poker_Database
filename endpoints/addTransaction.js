const { Transaction, User } = require('@m/models.js');
const { addDoc: addUser } = require('./addUser'); // Import addUser function

async function handler(req, res) {
    const response = {};
    try {
        const user = await User.findOne({ clubgg_id: req.body.clubgg_id });
        response.newUser = !user;
        // Add new user if not found
        if (response.newUser) {
            const { clubgg_id, discord_id, clubgg_name, discord_name, platform, paid_name } = req.body;
            const payment_handles = { [platform.toLowerCase()]: paid_name };
            const userDoc = { clubgg_id, discord_id, clubgg_name, discord_name, payment_handles };
            await addUser(userDoc);
            response.addedNewUser = 'success';
        }
    } catch (error) {
        console.log('Error checking user:', error);
        response.addedNewUser = 'fail';
    }
    try {
        await addTransaction(req.body);
        res.status(200).json({ ...response, message: 'success' });
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ ...response, error: 'Invalid transaction data' });
        }
        console.error('Error adding transaction:', error);
        res.status(500).json({ ...response, error: 'Internal Server Error' });
    }
}

async function addTransaction(transaction) {
    const doc = new Transaction(transaction);
    await doc.save();
}

module.exports = {
    method: 'post',
    path: '/addTransaction',
    handler,
    addDoc: addTransaction,
};