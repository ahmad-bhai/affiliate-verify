export default async function handler(req, res) {
    const { uid, status, sumdep } = req.query;
    
    const BOT_ID = "8320428359";
    const ACCOUNT_API_KEY = "G1tPtzH11mbtDlRnX70H_65McjpKB__8JxtRs8nw"; 

    if (!uid) return res.status(200).send("UID missing in URL");

    try {
        const bjs_url = `https://api.bots.business/v1/bots/${BOT_ID}/properties`;

        // POST Request with API Key in Headers
        const response = await fetch(bjs_url, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'api-key': ACCOUNT_API_KEY // BJS headers mein 'api-key' hi mangta hai
            },
            body: JSON.stringify({
                name: "qx_" + uid,
                value: status || "ftd",
                type: "string"
            })
        });

        const result = await response.json();

        // Agar response mein error hai
        if (result.errors || !response.ok) {
            return res.status(401).send("BJS Denied Access: " + JSON.stringify(result.errors || "Invalid Response"));
        }

        return res.status(200).send(`✅ Ahmad Bhai, FINAL SUCCESS! UID ${uid} is saved.`);

    } catch (error) {
        return res.status(500).send("System Error: " + error.message);
    }
}
