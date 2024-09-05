import { extract } from 'https://esm.sh/@extractus/article-extractor';
import { json, Router } from 'express'; // Asegúrate de importar `json` de `express` si estás usando Express
import cors from 'cors';

const router = Router();
router.use(cors());

router.get('/fetch', async (req, res) => {
    const url = req.query.url;
    if (!url) {
        return res.status(400).send('URL query parameter is required');
    }
    try {
        const article = await extract(url); // Usa extract directamente en el proxy
        res.json(article); // Enviar la respuesta en formato JSON
    } catch (error) {
        console.error('Error fetching data from URL:', error.message);
        res.status(500).send('Error fetching data');
    }
});

export default router;
