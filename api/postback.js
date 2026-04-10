export default async function handler(req, res) {
    const { uid, status } = req.query;
    
    const BOT_ID = "8320428359";
    const API_KEY = "AAFJLQfhXpzV0uzn0PO9lz1NqOO30uJFgok";

    if (!uid) return res.status(200).send("UID missing");

    try {
        // BJS GET method with API Key in URL (Sabse powerfull tareeka)
        const bjs_url = `https://api.bots.business/v1/bots/${BOT_ID}/properties?api_key=${API_KEY}&name=qx_${uid}&value=${status || "ftd"}&type=string`;

        const response = await fetch(bjs_url);
        const result = await response.json();

        // Agar BJS ne phir bhi error diya
        if (result.errors) {
            return res.status(401).send("BJS Still Rejecting Key: " + JSON.stringify(result.errors));
        }

        return res.status(200).send(`✅ Mubarak Ho Ahmad Bhai! UID ${uid} save ho gayi hai.`);

    } catch (error) {
        return res.status(500).send("System Error: " + error.message);
    }
}

