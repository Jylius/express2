const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/data', (req, res) => {
    console.log(req.body);
    res.send("Gönderilen veriler alındı kardeşim!"); 
});

// Basit bir middleware (isteğe bağlı)
// app.use((req, res, next) => {
//     console.log("Yeni bir istek alındı: " + Date.now());
//     next(); 
// });

// Ana sayfa (isteğe bağlı)
// app.get('/', (req, res) => {
//     res.send('Ana sayfa');
// });

app.listen(3000, () => {
    console.log("kardeş sorma artık la çalışıyorum.");
});
