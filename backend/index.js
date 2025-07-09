const express = require('express');
const cors = require('cors');
const router = require('./routes/index.routes.js');
require('./config/db.js').connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
    origin: ['http://localhost:5173', 'https://gorillapay.onrender.com'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/api/v1', router);


app.listen(PORT, () => console.log(`Backend server started at http://localhost:${PORT}`));