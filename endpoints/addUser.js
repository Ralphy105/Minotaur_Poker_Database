const { User } = require('../mongo/models.js');

async function handler(req, res) {
    try {
        const user = new User({
            clubgg_id: '1234567890',
            discord_id: '1234567890',
            clubgg_name: 'Test User',
            discord_name: 'Test Discord User',
            payment_handles: {
                venmo: 'test_venmo',
                zelle: 'test_zelle',
                cashapp: 'test_cashapp',
                paypal: 'test_paypal'
            }
        });
        await user.save();
        res.status(200).json({ message: 'Pong!' });
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    method: 'get',
    path: '/addUser',
    handler
};