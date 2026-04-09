export default async function (req, res) {
    const { uid, status } = req.query;
    
    // Apne Bot ka link yahan dalein (e.g., https://t.me/RQA_VIP_BOT)
    const BOT_NAME = "RQA_VIP_BOT"; // <--- Apne bot ka username bina @ ke yahan likhen

    if (!uid) return res.status(400).send("No UID");

    try {
        // BJS Webhook link (Ismein API key nahi chahiye hoti)
        const bjs_webhook = `https://api.bots.business/v1/bots/8320428359/commands/get_data_from_vercel?params=${uid}%20${status || "ftd"}`;
        
        // Is URL ko hit karenge
        await fetch(bjs_webhook);

        return res.status(200).send("Ahmad Bhai, Data Sent! Check Bot Properties.");
    } catch (error) {
        return res.status(500).send("Error: " + error.message);
    }
}
