async function handler(req, res) {
    try {
        res.status(200).json({ message: 'Pong!' });
    } catch (error) {
        console.error('Error in ping endpoint:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    method: 'get',
    path: '/ping',
    handler
};