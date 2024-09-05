const axios = require('axios');

exports.handler = async function(event, context) {
    const url = event.queryStringParameters.url;

    if (!url) {
        return {
            statusCode: 400,
            body: 'URL query parameter is required',
        };
    }

    try {
        const response = await axios.get(url);
        return {
            statusCode: 200,
            body: JSON.stringify(response.data),
        };
    } catch (error) {
        console.error('Error fetching data from URL:', error.message);
        return {
            statusCode: 500,
            body: 'Error fetching data',
        };
    }
};