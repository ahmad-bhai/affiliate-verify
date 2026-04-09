export default async function (req, res) {
    const { uid, status } = req.query;
    const BJS_BOT_ID = "8320428359"; 

    if (!uid) return res.status(400).send("No UID");

    try {
        // BJS ki command trigger karne ka link
        const url = `https://api.bots.business/v1/bots/${BJS_BOT_ID}/commands/get_data_from_vercel?params=${uid}%20${status || "ftd"}`;
        
        await fetch(url);
        return res.status(200).send("Ahmad Bhai, Data Sent! Check Bot Properties.");
    } catch (error) {
        return res.status(500).send("Error: " + error.message);
    }
}
