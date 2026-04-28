const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// 1. Root URL (/) par default 404 dikhao
app.get('/', (req, res) => {
    res.status(404).send('Page Not Found!');
});

// 2. Secret Route (Sirf aapko pata hoga)
// URL: http://localhost:3000/access-granted-88
app.get('/access-granted-88', (req, res) => {
    res.sendFile(path.join(__dirname, 'private_data', 'index.html'));
});

// 3. Koi bhi aur path ya file access karne ki koshish kare to 404
app.use((req, res) => {
    res.status(404).send('Page Not Found!');
});

app.listen(PORT, () => {
    console.log(`\n--- System Started ---`);
    console.log(`Fake Link: http://localhost:${PORT}`);
    console.log(`Secret Link: http://localhost:${PORT}/access-granted-88`);
});
