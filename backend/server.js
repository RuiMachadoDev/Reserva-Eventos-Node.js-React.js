const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Rotas
const restaurantRoutes = require('./routes/restaurants');
app.use('/api/restaurants', restaurantRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
