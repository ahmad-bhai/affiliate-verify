const express = require('express');
const app = express();
const PORT = 3000;

// Aapka HTML code yahan Base64 mein convert kar diya hai taake file mein bhi nazar na aaye
const encodedData = "PCFkb2N0eXBlIGh0bWw+PGh0bWw+PGhlYWQ+PHRpdGxlPkFobWFkIEJoYWkgU3lzdGVtPC90aXRsZT48L2hlYWQ+PGJvZHkgc3R5bGU9ImJhY2tncm91bmQ6IzAwMDsgY29sb3I6IzBmMDsgdGV4dC1hbGlnbjpjZW50ZXI7IHBhZGRpbmctdG9wOjUwcHg7Ij48aDE+QWNjZXNzIEdyYW50ZWQhPC9oMT48cD5ZZWggYWFwa2EgYXNsaSBzeXN0ZW0gaGFpLjwvcD48L2JvZHk+PC9odG1sPg==";

app.get('*', (req, res) => {
    // URL check: localhost:3000/ahmad
    if (req.url === '/ahmad') {
        const decodedHtml = Buffer.from(encodedData, 'base64').toString('utf-8');
        res.setHeader('Content-Type', 'text/html');
        return res.send(decodedHtml);
    }

    // Default: Sirf "Page Not Found!"
    // Source code (View Source) mein sirf yahi 3 words ayenge
    res.status(404).setHeader('Content-Type', 'text/plain').send('Page Not Found!');
});

app.listen(PORT, () => {
    console.log(`Server is Running!`);
    console.log(`Open this link: http://localhost:3000/ahmad`);
});
