const { Transaction } = require('@m/models.js');

async function handler(req, res) {
    try {
        const transaction = new Transaction(req.body);
        await transaction.save();
        res.status(200).json({ message: 'Pong!' });
    } catch (error) {
        console.error('Error adding transaction:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    method: 'post',
    path: '/addTransaction',
    handler
};