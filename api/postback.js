export default async function (req, res) {
    const { uid, status } = req.query;
    const BOT_ID = "8320428359";
    const API_KEY = "AAET0DP7fhG5VLXM-8ge7jzU8ck9oYbulH0";

    if (!uid) return res.status(400).send("No UID");

    try {
        // BJS ki property set karne ka direct URL
        const bjs_url = `https://api.bots.business/v1/bots/${BOT_ID}/properties?api_key=${API_KEY}&name=qx_${uid}&value=${status || "ftd"}&type=string`;
        
        const response = await fetch(bjs_url);
        const result = await response.text();

        return res.status(200).send("Success! BJS Saved: " + result);
    } catch (error) {
        return res.status(500).send("Error: " + error.message);
    }
}
