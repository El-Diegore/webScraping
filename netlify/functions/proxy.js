// proxy.js
import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());

app.get('/fetch', async (req, res) => {
    const url = req.query.url;
    if (!url) {
        return res.status(400).send('URL query parameter is required');
    }
    try {
        const response = await axios.get(url); // Usar axios.get() en lugar de get() directamente
        res.send(response.data);
    } catch (error) {
        console.error('Error fetching data from URL:', error.message);
        res.status(500).send('Error fetching data');
    }
});

app.listen(port, () => {
    console.log(`Proxy server listening at http://localhost:${port}`);
});
