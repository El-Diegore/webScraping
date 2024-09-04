// index.js (ES6 module)
import { extract } from 'https://esm.sh/@extractus/article-extractor';

document.getElementById('extractButton').addEventListener('click', async () => {
    const url = document.getElementById('urlInput').value;
    const resultDiv = document.getElementById('result');
    const loadingDiv = document.getElementById('loading');
    
    // Muestra el indicador de carga
    loadingDiv.style.display = 'block';
    resultDiv.innerHTML = '';

    try {
        // Usa el proxy para hacer la solicitud
        const proxyUrl = `http://localhost:3000/fetch?url=${encodeURIComponent(url)}`;
        const article = await extract(proxyUrl);
        if (article) {
            resultDiv.innerHTML = `
                <h2>${article.title}</h2>
                <p>${article.content}</p>
            `;
        } else {
            resultDiv.innerHTML = '<p>No se pudo extraer ningún artículo.</p>';
        }
    } catch (error) {
        console.error('Error al extraer el artículo', error);
        resultDiv.innerHTML = '<p>Hubo un error al extraer el artículo.</p>';
    } finally {
        // Oculta el indicador de carga
        loadingDiv.style.display = 'none';
    }
});