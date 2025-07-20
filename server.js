const express = require('express')
const fs = require('fs');
const cors = require('cors');
const app = express()
app.use(cors());
const port = 3001

const cardPath = './Cards';

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/imageList', function(req, res) {
    fs.readFile('./cards.json', (err, json) => {
        res.json(JSON.parse(json))
    }
    )});

app.get('/img/category/:category{/domain/:domain}/name/:name', cors(), function(req, res) {
    const category = req.params.category;
    const name = req.params.name;
    const domain = req.params.domain ? req.params.domain+"/" : "";
    const filePath = `${cardPath}/${category}/${domain}${name}.png`;
    const fileType = 'image/png';
    const readStream = fs.createReadStream(filePath);
    readStream.on('open', function() {
        res.set('Content-Type', fileType);
        readStream.pipe(res);
    })
    readStream.on('error', function() {
        res.set('Content-Type', 'text/plain');
        res.status(404).end('Not found');
    })
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })