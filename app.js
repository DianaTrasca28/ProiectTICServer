require('dotenv').config();
const express = require("express");
const cors = require('cors');
const app = express();
const userRoutes = require('./src/routes/userRoutes');
const perfumesRoutes = require('./src/routes/perfumesRoutes');
const generatePerfumeData = require('./src/utils/randomData');
app.use(express.json());
app.use(cors());
app.use(cors({
    origin: 'http://localhost:3000', // Specifică domeniul clientului tău
    credentials: true, // Permite credențiale (cookie-uri, token-uri, etc.)
}));



// Rutele pentru utilizatori
app.use('/api/users', userRoutes);
// Rutele pentru parfumuri
app.use('/api/perfumes', perfumesRoutes);

app.listen(8000, () => {
    //generateUserList(150)
    console.log('Serverul a pornit pe portul 8000');
});