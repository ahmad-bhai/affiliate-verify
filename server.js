const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Yeh exact wahi text hai jo aapne manga hai
const responseText = `404: NOT_FOUND
Code: NOT_FOUND
ID: sin1::x7pwq-1777404782061-921f3a347ac1`;

app.all('*', (req, res) => {
    // 1. Browser ko batana ke yeh koi HTML page nahi hai, sirf kora kagaz (Plain Text) hai
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    
    // 2. Cache khatam karna taake har dafa naya "Not Found" lage
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    
    // 3. Security headers taake koi frame mein na daal sake
    res.setHeader('X-Content-Type-Options', 'nosniff');

    // 4. Real 404 Status Code bhejna
    res.status(404).send(responseText);
});

app.listen(PORT, () => {
    console.log(`System is invisible now on port ${PORT}`);
});
