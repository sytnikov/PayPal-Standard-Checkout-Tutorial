import fetch from 'node-fetch';

const endpoint_url = process.env.ENVIRONMENT === 'sandbox' 
  ? 'https://api-m.sandbox.paypal.com' 
  : 'https://api-m.paypal.com';

export default async function getAccessToken() {
  const auth = `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`;
  const data = 'grant_type=client_credentials';

  const response = await fetch(`${endpoint_url}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(auth).toString('base64')}`,
    },
    body: data,
  });

  const json: any = await response.json();
  return json.access_token;
}
