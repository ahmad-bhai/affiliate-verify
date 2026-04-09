const axios = require('axios');

module.exports = async (req, res) => {
    // CORS headers taake frontend access kar sake
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');

    const { id } = req.query;

    if (!id || id.length !== 8) {
        return res.status(400).json({ error: 'Invalid ID' });
    }

    try {
        const partnerUrl = `https://quotex-partner.com/statistics?search=${id}`;
        
        const response = await axios.get(partnerUrl, {
            headers: {
                'Cookie': '3da0bb34aa8777399260f01449cc0c24', // Yahan apni lambi cookie paste karen
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            },
            timeout: 10000 // 10 seconds timeout
        });

        const html = response.data;

        if (html.includes(id)) {
            // Check for zero deposit indicators
            const isZero = html.includes("$0.00") || html.includes("<td>0</td>") || html.includes("<td>0.00</td>");
            
            if (isZero) {
                res.status(200).json({ status: 'no_deposit' });
            } else {
                res.status(200).json({ status: 'success' });
            }
        } else {
            res.status(200).json({ status: 'not_found' });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
