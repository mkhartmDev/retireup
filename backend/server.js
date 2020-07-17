const express = require('express');
const fs = require('fs');
var cors = require('cors');
const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.get('/data', (req, res) => {

   fs.readFile('./data/sp500.json', (err, json) => {
       let obj = JSON.parse(json);
       res.json(obj);
 });

});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});