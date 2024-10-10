const express = require('express');
const app = express();
//a simple middleware 
app.use((req,res,next)=>{
    console.log("you get new request : " + Date.now());
    next(); // 
})

app.get('/',(req,res)=>{
    res.send('Ana sayfa');
});

app.listen(3000, ()=>{
    console.log("kardeş sorma artık la çalışıyorum");
})