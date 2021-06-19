const express = require('express');
const app = express();

// testing 
app.use((req, res) => {
  res.json({ message: 'Skeleton'});
});

module.exports = app;