const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Q1 & Q2: The Hardcoded Menu Server / Visual Catalog
// This endpoint sends back the food items with names, prices, categories, and image links.
app.get('/catalog', (req, res) => {
    const catalogPath = path.join(__dirname, 'catalog.json');
    fs.readFile(catalogPath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read catalog data' });
        }
        res.json(JSON.parse(data));
    });
});

// Q3: The Order Logger
// This "Receiver" (POST) endpoint simulates a Manager receiving an order.
// It prints the order details to the terminal screen.
app.post('/order', (req, res) => {
    const orderData = req.body;
    
    console.log('\n==========================================');
    console.log('🍽️  [MANAGER] NEW ORDER RECEIVED!');
    console.log('------------------------------------------');
    console.log(`Customer: ${orderData.user || 'Guest'}`);
    console.log(`Table: ${orderData.table || 'N/A'}`);
    console.log('Items Ordered:');
    orderData.items.forEach((item, index) => {
        console.log(`  ${index + 1}. ${item.name} x${item.quantity} - Rs ${item.price * item.quantity}`);
    });
    console.log('------------------------------------------');
    console.log(`TOTAL AMOUNT: Rs ${orderData.total}`);
    console.log('==========================================\n');

    res.status(200).json({ 
        message: 'Order received by Manager!', 
        orderId: Math.floor(Math.random() * 1000000) 
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Spice with Hassan Backend running on http://localhost:${PORT}`);
    console.log(`📂 Catalog Link: http://localhost:${PORT}/catalog`);
});
