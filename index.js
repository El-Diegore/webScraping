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

        // Verifica si la respuesta es correcta
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const htmlData = await response.text(); // Usa .text() para obtener el HTML
        const article = await extract(htmlData); // Pasa el HTML a `extract`

            if (article) {
                resultDiv.innerHTML = `
                    <h2>${article.title}</h2>
                    <p>${article.content}</p>
                `;
            } else {
                resultDiv.innerHTML = '<p>No se pudo extraer ningún artículo.</p>';
            }
        } else {
            resultDiv.innerHTML = '<p>Respuesta no contiene HTML.</p>';
        }
    } catch (error) {
        console.error('Error al extraer el artículo', error);
        resultDiv.innerHTML = '<p>Hubo un error al extraer el artículo.</p>';
    } finally {
        loadingDiv.style.display = 'none';
    }
});
