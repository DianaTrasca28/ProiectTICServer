const express = require("express");
const cors = require('cors');
const app = express();
const userRoutes = require('./src/routes/userRoutes');
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    next();
});

// Rutele pentru utilizatori
app.use('/api/users', userRoutes);

app.listen(8000, () => {
    //generateUserList(150)
    console.log('Serverul a pornit pe portul 8000');
});