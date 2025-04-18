const { User } = require('@m/models.js');

async function handler(req, res) {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(200).json({ message: 'Pong!' });
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    method: 'post',
    path: '/addUser',
    handler
};