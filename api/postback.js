import { kv } from '@vercel/kv';

export default async function handler(req, res) {
    // CORS headers taake aapka frontend asani se connect ho sake
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        // 1. DATA RECEIVE KARNA (From Quotex GET)
        if (req.method === 'GET') {
            const { uid, status, sumdep, sumwithdraw, country } = req.query;

            if (!uid) {
                return res.status(400).json({ error: "No Trader ID provided" });
            }

            const userData = {
                trader_id: uid,
                status: status || 'reg',
                deposit: sumdep || "0",
                withdraw: sumwithdraw || "0",
                country: country || "Unknown",
                lastUpdated: new Date().toISOString()
            };

            // KV Store mein save karein
            await kv.set(`user:${uid}`, userData);
            return res.status(200).send("Postback Received Successfully");
        }

        // 2. DATA VERIFY KARNA (From Your Web Dashboard POST)
        if (req.method === 'POST') {
            const { checkId } = req.body;
            
            if (!checkId) {
                return res.status(400).json({ success: false, message: "Enter ID" });
            }

            const user = await kv.get(`user:${checkId}`);

            if (user) {
                return res.status(200).json({ success: true, ...user });
            } else {
                return res.status(404).json({ success: false, message: "ID not found in database" });
            }
        }
    } catch (error) {
        console.error("Internal Error:", error);
        return res.status(500).json({ success: false, error: error.message });
    }
}
