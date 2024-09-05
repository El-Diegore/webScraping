// netlify/functions/proxy.js

import { get } from 'axios';

export async function handler(event, context) {
    const url = event.queryStringParameters.url;

    if (!url) {
        return {
            statusCode: 400,
            body: 'URL query parameter is required',
        };
    }

    try {
        const response = await get(url);
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(response.data),
        };
    } catch (error) {
        console.error('Error fetching data from URL:', error.message);
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            body: 'Error fetching data',
        };
    }
}
