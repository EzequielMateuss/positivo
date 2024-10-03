const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

// Middleware para habilitar CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    next();
});

// Endpoint para fazer proxy da transação
app.post('/proxy/transaction', async (req, res) => {
    try {
        const response = await axios.post('https://api.paghub.io/functions/v1/transactions', req.body, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${Buffer.from('pa_live_NFV3YkZ6MXhsZ1VCR0E1:x').toString('base64')}`,
                'accept': 'application/json'
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(error.response ? error.response.status : 500).json(error.response ? error.response.data : { error: 'Erro no servidor proxy' });
    }
});

app.listen(3000, () => {
    console.log('Servidor proxy rodando na porta 3000');
});
