const express = require('express');
const app = express();

app.get('/', function (req, res) {
  res.send('Hello World from Node.js via ngrok');
});

const port = 3000;
app.listen(port);
console.log(`Server is listening on port ${port}`);
