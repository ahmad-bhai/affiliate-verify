// api/postback.js
import { kv } from '@vercel/kv';

export default async function handler(req, res) {
    // 1. GET Request (Quotex se data receive karna)
    if (req.method === 'GET') {
        const { uid, status, sumdep, sumwithdraw, country } = req.query;

        if (!uid) return res.status(400).send("No UID");

        // User ka data object banana
        const userData = {
            trader_id: uid,
            status: status,
            deposit: sumdep || "0",
            withdraw: sumwithdraw || "0",
            country: country || "Unknown",
            lastUpdated: new Date().toISOString()
        };

        // Vercel KV mein save karna (ID ke name se)
        await kv.set(`user:${uid}`, userData);

        return res.status(200).send("Postback Success");
    }

    // 2. POST Request (Aapke Frontend Dashboard se verification)
    if (req.method === 'POST') {
        const { checkId } = req.body;
        
        // KV database se user dhoondna
        const user = await kv.get(`user:${checkId}`);

        if (user) {
            return res.status(200).json({ success: true, ...user });
        } else {
            return res.status(404).json({ success: false, message: "Trader ID not found" });
        }
    }

    return res.status(405).send("Method Not Allowed");
}
