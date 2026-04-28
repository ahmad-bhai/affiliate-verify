const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Step 1: Root URL (/) par bhi "Page Not Found" dikhao
app.get('/', (req, res) => {
    res.status(404).send('Page Not Found!');
});

// Step 2: Secret Route jo actual file dikhayega
// Is URL ko aap apni marzi se change kar sakte hain
app.get('/my-hidden-login-123', (req, res) => {
    // File ko 'private_pages' folder mein rakhein taake direct access na ho
    res.sendFile(path.join(__dirname, 'private_pages', 'index.html'));
});

// Step 3: Baki har kisam ki request (files, folders, etc.) ko block karein
app.use((req, res) => {
    res.status(404).send('Page Not Found!');
});

app.listen(PORT, () => {
    console.log(`Server is running! Secret link: http://localhost:${PORT}/my-hidden-login-123`);
});
