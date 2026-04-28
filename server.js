const express = require('express');
const app = express();
const PORT = 3000;

// Yeh hai wo text jo aap show karna chahte hain
// Iske aage space ya aisi formatting hai jo devtools ko error dikhane pe majboor karegi
const fakeError = `404: NOT_FOUND
Code: NOT_FOUND
ID: sin1::zpphn-1777403452659-9803bdf40879`;

app.get('/', (req, res) => {
    // 1. Content-Type ko plain text rakhna zaroori hai taake HTML gayab ho jaye
    res.setHeader('Content-Type', 'text/plain');
    
    // 2. Status code 404 bhejein taake browser aur tools ko lage page missing hai
    res.status(404).send(fakeError);
});

// Agar koi aur link bhi khole tab bhi yahi show ho
app.use((req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send(fakeError);
});

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
