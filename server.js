const express = require('express');
const app = express();
const port = 5000;

app.get('/api/health', (req, res) => {
  res.json({ status: 'UP' });
});

app.get('/api/error', (req, res) => {
  res.status(500).json({status: 'DOWN'});
});

app.get('/api/delay/:seconds', (req, res) => {
  const seconds = parseInt(req.params.seconds) || 1;
  setTimeout(() => {
    res.json({ message: `Delayed response after ${seconds} seconds` });
  }, seconds * 1000);
});

app.listen(port, () => {
  console.log(`API server running at http://0.0.0.0:${port}`);
});
