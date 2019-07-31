const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

//get route
app.get('/express', (req, res)=>{
    res.json('Express backend is now connected to react');
});

app.listen(3000, ()=> console.log('Listening on port 3000'))