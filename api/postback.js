export default async function (req, res) {
    const { uid, status } = req.query;
    
    // YAHAN APNI ACCOUNT WALI API KEY DALEIN
    const API_KEY = "AAET0DP7fhG5VLXM-8ge7jzU8ck9oYbulH0"; 
    const BOT_ID = "8320428359";

    if (!uid) return res.status(400).send("No UID");

    try {
        // BJS API call with headers (zyada secure tarika)
        const bjs_url = `https://api.bots.business/v1/bots/${BOT_ID}/properties`;
        
        const response = await fetch(bjs_url, {
            method: 'POST',
            headers: {
                'api-key': API_KEY,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: "qx_" + uid,
                value: status || "ftd",
                type: "string"
            })
        });

        const result = await response.text();
        return res.status(200).send("BJS Response: " + result);
    } catch (error) {
        return res.status(500).send("Error: " + error.message);
    }
}
