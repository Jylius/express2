const express = require('express');
const app = express();

const things = require("./routes/things.js");
app.use('/things',things);

app.listen(3000, ()=>{
   console.log('server is active on zort 3000');
})