import getAccessToken from './get_access_token';

const endpoint_url = process.env.ENVIRONMENT === 'sandbox' 
  ? 'https://api-m.sandbox.paypal.com' 
  : 'https://api-m.paypal.com';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const access_token = await getAccessToken();
    const { order_id, intent } = req.body;

    const response = await fetch(
      `${endpoint_url}/v2/checkout/orders/${order_id}/${intent}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error completing order' });
  }
}
