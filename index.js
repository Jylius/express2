const express = require('express');
const app = express();

// Dinamik oldu
app.get('/:id', (req, res) => {
    res.send('The id you specified is ' + req.params.id);
});

app.get('/things/:id([0-9]{5})',(req,res)=>{ //burada sadece 5 basamaklı sayıları görüyor
    res.send('id : ' + req.params.id)
})

// dinamik bir isim yanına dinamik bir id 
app.get('/things/:name/:id', (req, res) => {
    res.send('id: ' + req.params.id + ' and name: ' + req.params.name);
});

app.get('*',(req, res)=>{
    res.send('Krdşm değişik değişik şeyler deneme\n Gel ana menüye dön');
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
