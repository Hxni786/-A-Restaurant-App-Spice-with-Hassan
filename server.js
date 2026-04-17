const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

const CATALOG_DATA = {
  "daily_specials": [
    {
      "id": 1,
      "name": "Samosa Platter",
      "price": 350,
      "category": "Starters",
      "description": "Crispy pastry filled with spiced potatoes & peas. Served with mint & tamarind chutneys.",
      "image_url": "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80"
    },
    {
      "id": 2,
      "name": "Seekh Kebab",
      "price": 750,
      "category": "Starters",
      "description": "Minced lamb & beef with aromatic herbs, char-grilled on iron skewers.",
      "image_url": "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&q=80"
    },
    {
      "id": 3,
      "name": "Paneer Tikka",
      "price": 650,
      "category": "Starters",
      "description": "Cottage cheese marinated in spiced yogurt, charred in the tandoor.",
      "image_url": "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=600&q=80"
    },
    {
      "id": 4,
      "name": "Chicken Biryani",
      "price": 950,
      "category": "Main Course",
      "description": "Fragrant basmati rice with tender chicken, saffron & whole spices.",
      "image_url": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&q=80"
    },
    {
      "id": 5,
      "name": "Butter Chicken",
      "price": 1100,
      "category": "Main Course",
      "description": "Succulent chicken in a velvety tomato-cream sauce.",
      "image_url": "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600&q=80"
    },
    {
      "id": 6,
      "name": "Lamb Karahi",
      "price": 1400,
      "category": "Main Course",
      "description": "Slow-cooked lamb with tomatoes, ginger & green chillies in karahi.",
      "image_url": "https://images.unsplash.com/photo-1574653853027-5382a3d23a15?w=600&q=80"
    },
    {
      "id": 12,
      "name": "Mango Lassi",
      "price": 280,
      "category": "Drinks",
      "description": "Chilled yogurt blended with fresh mangoes, cardamom & rose.",
      "image_url": "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=600&q=80"
    },
    {
      "id": 14,
      "name": "Gulab Jamun",
      "price": 320,
      "category": "Desserts",
      "description": "Milk-solid dumplings in rose & cardamom sugar syrup. Served warm.",
      "image_url": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600&q=80"
    }
  ]
};

// Q1 & Q2: The Hardcoded Menu Server / Visual Catalog
app.get('/catalog', (req, res) => {
    res.json(CATALOG_DATA);
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
