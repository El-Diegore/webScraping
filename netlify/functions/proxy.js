import axios from 'axios';
import cheerio from 'cheerio';

export const handler = async (event) => {
  const url = event.queryStringParameters?.url;
  if (!url) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'URL query parameter is required' }),
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }

  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    // Limitar el tamaño de las imágenes
    $('img').each((i, img) => {
      $(img).attr('style', 'max-width: 100%; height: auto;');
    });

    const cleanedHtml = $.html();

    return {
      statusCode: 200,
      body: JSON.stringify({ html: cleanedHtml }), // Asegúrate de que el HTML esté en JSON
      headers: {
        'Content-Type': 'application/json',
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

