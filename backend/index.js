const express = require('express');
const cors = require('cors');
const router = require('./routes/index.routes.js');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use('/', router);


app.listen(PORT, ()=>console.log(`Backend server started at http://localhost:${PORT}`));