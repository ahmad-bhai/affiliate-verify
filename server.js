const express = require('express');
const app = express();
const PORT = 3000;

// Aapka asli HTML code (Yahan apna dashboard ya script paste karein)
const secretContent = `
<!DOCTYPE html>
<html>
<head><title>Ahmad Bhai System</title></head>
<body style="background:#000; color:#0f0; text-align:center; padding-top:50px;">
    <h1>Access Granted!</h1>
    <p>Yeh aapka asli system hai jo single file mein hide hai.</p>
</body>
</html>
`;

app.get('*', (req, res) => {
    // Secret Key check: Agar URL mein ?key=ahmad123 hoga tabhi page khulega
    // Example: http://localhost:3000/?key=ahmad123
    if (req.query.key === 'ahmad123') {
        res.setHeader('Content-Type', 'text/html');
        return res.send(secretContent);
    }

    // Default Response: Sab ke liye sirf plain text
    // Source code mein bhi sirf yahi 3 words nazar ayenge
    res.status(404).setHeader('Content-Type', 'text/plain').send('Page Not Found!');
});

app.listen(PORT, () => {
    console.log(`Server is LIVE on Port: ${PORT}`);
    console.log(`Open: http://localhost:${PORT}/?key=ahmad123`);
});
