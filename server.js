const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(express.static('.'));
app.use(bodyParser.json());

const DATA_FILE = 'data.json';

// Helper to read/write JSON
function readData() {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
}

function writeData(data) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

// GET all users
app.get('/data', (req, res) => {
    const data = readData();
    res.json(data);
});

// POST a new user
app.post('/data', (req, res) => {
    const data = readData();
    const { name, age, course } = req.body;
    const uid = data.length ? Math.max(...data.map(u => u.uid)) + 1 : 101;
    data.push({ uid, name, age, course });
    writeData(data);
    res.json({ message: 'User added', uid });
});

// PUT to update a user
app.put('/data/:uid', (req, res) => {
    const uid = parseInt(req.params.uid);
    const { name, age, course } = req.body;
    const data = readData();
    const user = data.find(u => u.uid === uid);
    if (!user) return res.status(404).json({ error: 'User not found' });
    user.name = name;
    user.age = age;
    user.course = course;
    writeData(data);
    res.json({ message: 'User updated' });
});

// DELETE a user
app.delete('/data/:uid', (req, res) => {
    const uid = parseInt(req.params.uid);
    let data = readData();
    data = data.filter(u => u.uid !== uid);
    writeData(data);
    res.json({ message: 'User deleted' });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
