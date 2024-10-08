import { extract } from 'https://esm.sh/@extractus/article-extractor';

document.getElementById('extractButton').addEventListener('click', async () => {
    const url = document.getElementById('urlInput').value;
    const resultDiv = document.getElementById('result');
    const loadingDiv = document.getElementById('loading');
    
    loadingDiv.style.display = 'block';
    resultDiv.innerHTML = '';

    try {
        const proxyUrl = `/.netlify/functions/proxy?url=${encodeURIComponent(url)}`;
        const response = await fetch(proxyUrl);
        const data = await response.json();  // Asegúrate de que la respuesta sea JSON
        let article;
        
        try {
            article = await extract(data);
        } catch (extractError) {
            console.error('Error al extraer el artículo', extractError);
            resultDiv.innerHTML = '<p>Error al extraer el artículo.</p>';
            return;
        }

        if (article) {
            resultDiv.innerHTML = `
                <h2>${article.title}</h2>
                <p>${article.content}</p>
            `;
        } else {
            resultDiv.innerHTML = '<p>No se pudo extraer ningún artículo.</p>';
        }
    } catch (error) {
        console.error('Error al obtener los datos del proxy', error);
        resultDiv.innerHTML = '<p>Hubo un error al obtener los datos.</p>';
    } finally {
        loadingDiv.style.display = 'none';
    }
});
