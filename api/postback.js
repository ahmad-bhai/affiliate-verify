export default async function (req, res) {
    const { uid, status } = req.query;
    
    // YAHAN WOHI KEY DALEIN JO STEP 1 MEIN MILI
    const API_KEY = "AAFJLQfhXpzV0uzn0PO9lz1NqOO30uJFgok"; 
    const BOT_ID = "8320428359";

    if (!uid) return res.status(400).send("No UID provided");

    try {
        const bjs_url = `https://api.bots.business/v1/bots/${BOT_ID}/properties`;
        
        const response = await fetch(bjs_url, {
            method: 'POST',
            headers: {
                'api-key': API_KEY, // Yeh headers mein bhejna zyada secure hai
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: "qx_" + uid,
                value: status || "ftd",
                type: "string"
            })
        });

        const result = await response.json();

        // Agar result mein property ki details aa gayi hain, to success hai
        if (result.name) {
            return res.status(200).send("Success! ID " + uid + " is now in BJS database.");
        }

        // Agar ab bhi error hai
        return res.status(401).send("BJS Response: " + JSON.stringify(result));
        
    } catch (error) {
        return res.status(500).send("System Error: " + error.message);
    }
}
