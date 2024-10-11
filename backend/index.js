const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');

const app = express();

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:8080'
}));
// app.use((req, res)=>{
//     res.status(404).send('<h1>buralara bakma bozarsın</h1>');
//     // sadece 404 veriyor sayfaya yani kullanmasanda olur
// });
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB bağlantısı başarılı'))
    .catch((err) => console.error('MongoDB bağlantı hatası:', err));

app.get('/', (req, res) => {
    res.send('Backend Çalışıyor!');
});

const animeRoutes = require('./routes/animeRoutes'); 
app.use('/api/animes', animeRoutes);

const userRoutes = require('./routes/userRoutes'); 
app.use('/api/users', userRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda çalışıyor`);
});