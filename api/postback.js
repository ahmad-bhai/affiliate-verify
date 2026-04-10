export default async function handler(req, res) {
    const { uid, status, sumdep } = req.query;
    
    const BOT_ID = "8320428359";
    // Aapki asli Account API Key
    const ACCOUNT_API_KEY = "G1tPtzH11mbtDlRnX70H_65McjpKB__8JxtRs8nw"; 

    if (!uid) return res.status(200).send("UID missing");

    try {
        // BJS API call (Property name: qx_ID)
        const bjs_url = `https://api.bots.business/v1/bots/${BOT_ID}/properties?api_key=${ACCOUNT_API_KEY}&name=qx_${uid}&value=${status || "ftd"}&type=string`;

        const response = await fetch(bjs_url);
        const result = await response.json();

        if (result.errors) {
            return res.status(401).send("BJS Error: " + JSON.stringify(result.errors));
        }

        // Agar deposit amount bhi aaya hai toh usse bhi save karein
        if (sumdep) {
            const dep_url = `https://api.bots.business/v1/bots/${BOT_ID}/properties?api_key=${ACCOUNT_API_KEY}&name=qx_dep_amt_${uid}&value=${sumdep}&type=string`;
            await fetch(dep_url);
        }

        return res.status(200).send(`✅ Ahmad Bhai, Success! UID ${uid} saved in BJS.`);

    } catch (error) {
        return res.status(500).send("System Error: " + error.message);
    }
}
