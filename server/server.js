const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const port = 3001;
require('dotenv').config();

app.use(cors());
app.use(express.json());

// Make API request to fetch token
const fetchToken = async () => {
  try {
    const response = await axios({
      method: 'POST',
      url: 'https://securelink-staging.valorpaytech.com:4430/?gptoken=',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: {
        appid: process.env.APP_ID,
        appkey: process.env.APP_KEY,
        txn_type: 'clientToken',
        epi: process.env.EPI,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error making API request:', error);
    throw error;
  }
};

// Express route to fetch token
app.post('/fetch-data', async (req, res, next) => {
  try {
    const responseData = await fetchToken();
    res.status(200).json(responseData);
  } catch (error) {
    next(error);
  }
});

//Fetch Card Token
app.post('/submit-form', async (req, res) => {
  try {
    const { cardNumber, expiryDate, clientToken } = req.body;
    const formattedCardNumber = cardNumber.replace(/\D/g, '');
    const formattedExpiryDate = expiryDate.replace(/\//g, '');
    const params = new URLSearchParams({
      txn_type: 'cardToken',
      epi: process.env.EPI,
      client_token: clientToken,
      pan: formattedCardNumber,
      expirydate: formattedExpiryDate,
    });

    const response = await axios.post('https://securelink-staging.valorpaytech.com:4430/', params, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    // Handle the response from the API
    if (response.data) {
      res.status(200).json({ cardToken: response.data.cardToken });
    } else {
      res.status(400).json({ error: 'Error fetching card token' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//Fetch Sale Api
app.post('/sale-api', async (req, res) => {
  try {
    const { token, amount, surchargeIndicator, surchargeAmount, phone, address1, address2, city, state, shipping_country, billing_country, zip, email } = req.body;

    const formattedPhone = phone.replace(/\D/g, '');

    const params = new URLSearchParams({
      appid: process.env.APP_ID,
      appkey: process.env.APP_KEY,
      epi: process.env.EPI,
      txn_type: 'sale',
      token,
      amount,
      surchargeIndicator,
      surchargeAmount,
      phone: formattedPhone,
      address1,
      address2: address2 || '',
      city,
      state,
      shipping_country,
      billing_country,
      zip,
      email,
    });

    const response = await axios.post('https://securelink-staging.valorpaytech.com:4430/', params, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    if (response.data) {
      res.status(200).json(response.data);
    } else {
      res.status(400).json({ error: 'Error processing sale transaction' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
