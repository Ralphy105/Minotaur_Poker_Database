require('dotenv').config();
const { dbConnect } = require('./mongo/init.js');
const fs = require('node:fs');
const path = require('node:path');
const express = require('express');

const endpointsPath = path.join(__dirname, 'endpoints');
const endpointFiles = fs.readdirSync(endpointsPath).filter(file => file.endsWith('.js'));

(async () => {
    const connection = await dbConnect();
    if (connection) console.log('MongoDB connected successfully!');

    const app = express();
    app.use(express.json());
    const PORT = process.env.PORT || 3000;

    for (const file of endpointFiles) {
		const filePath = path.join(endpointsPath, file);
		const endpoint = require(filePath);
		switch (endpoint.method) {
            case 'get':
                app.get(endpoint.path, endpoint.handler);
                break;
            case 'post':
                app.post(endpoint.path, endpoint.handler);
                break;
            case 'put':
                app.put(endpoint.path, endpoint.handler);
                break;
            case 'delete':
                app.delete(endpoint.path, endpoint.handler);
                break;
            default:
                console.error(`Unhandled or invalid method ${endpoint.method} for ${endpoint.path}`);
        }
	}

    // Middleware to handle 404 errors
    app.use((req, res) => {
        res.status(404).send(`
            <html>
                <head>
                    <title>404 Not Found</title>
                </head>
                <body>
                    <h1>404 Not Found</h1>
                    <p>The requested resource was not found on this server.</p>
                </body>
            </html>
        `);
    });

    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
})();