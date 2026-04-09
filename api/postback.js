export default async function (req, res) {
    const { uid, status } = req.query;
    
    // YAHAN NAYI WALI API KEY PASTE KAREIN
    const API_KEY = "AAFJLQfhXpzV0uzn0PO9lz1NqOO30uJFgok"; 
    const BOT_ID = "8320428359";

    if (!uid) return res.status(400).send("No UID");

    try {
        // BJS GET Method URL (Sabse zyada stable)
        const bjs_url = `https://api.bots.business/v1/bots/${BOT_ID}/properties?api_key=${API_KEY}&name=qx_${uid}&value=${status || "ftd"}&type=string`;
        
        const response = await fetch(bjs_url);
        const result = await response.json();

        if (result.errors) {
            return res.status(401).send("BJS Key Error: " + JSON.stringify(result.errors));
        }

        return res.status(200).send("Success! ID saved in BJS: " + uid);
    } catch (error) {
        return res.status(500).send("Error: " + error.message);
    }
}
