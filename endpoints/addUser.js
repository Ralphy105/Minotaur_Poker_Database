const { User } = require('@m/models.js');

async function handler(req, res) {
    try {
        await addUser(req.body);
        res.status(200).json({ message: 'success' });
    } catch (error) {
        if (err.name === 'MongoServerError' && err.code === 11000) {
            return res.status(409).json({ error: 'User already exists' });
        }
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: 'Invalid user data' });
        }
        console.error('Error adding user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function addUser(user) {
    const doc = new User(user);
    await doc.save();
}

module.exports = {
    method: 'post',
    path: '/addUser',
    handler,
    addDoc: addUser,
};