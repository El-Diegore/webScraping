const axios = require('axios');
const cheerio = require('cheerio');

const handler = async (event) => {
  const url = event.queryStringParameters?.url;
  if (!url) {
    return {
      statusCode: 400,
      body: 'URL query parameter is required',
    };
  }

  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    // Limitar el tamaño de las imágenes
    $('img').each((i, el) => {
      $(el).css('max-width', '100%');
      $(el).css('height', 'auto');
    });

    return {
      statusCode: 200,
      body: $.html(),
      headers: {
        'Content-Type': 'text/html',
      },
    };
  } catch (error) {
    console.error('Error fetching data from URL:', error.message);
    return {
      statusCode: 500,
      body: 'Error fetching data',
    };
  }
};

module.exports = { handler };
