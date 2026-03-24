const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.static('.')); // serve static files (HTML, CSS, JS)

app.get('/data', (req, res) => {
    const rawData = fs.readFileSync('data.json');
    const data = JSON.parse(rawData);
    res.json(data);
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));