import axios from 'axios';

export const handler = async (event) => {
  const url = event.queryStringParameters?.url;
  if (!url) {
    return {
      statusCode: 400,
      body: 'URL query parameter is required',
    };
  }

  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    // Limitar el tamaño de las imágenes
    $('img').each((i, img) => {
      $(img).attr('style', 'max-width: 100%; height: auto;');
    });

    // Limitar el tamaño del contenido HTML
    const cleanedHtml = $.html();

    return {
      statusCode: 200,
      body: response.data, // Devuelve el HTML directamente
      headers: {
        'Content-Type': 'text/html', // Cambia a 'text/html'
      },
    };
  } catch (error) {
    console.error('Error fetching data from URL:', error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error fetching data' }), // Devolver un JSON en caso de error
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }
};
