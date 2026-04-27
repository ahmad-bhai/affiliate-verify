// Global variable memory mein data save karne ke liye
// Note: Ye data deploy ya server restart hone par clear ho jayega
let traderStore = {};

export default async function handler(req, res) {
    // CORS configuration taake frontend block na ho
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    try {
        const { uid, status, sumdep, sumwithdraw, country } = req.query;

        // 1. Quotex se Data Aana (GET Request)
        if (uid) {
            traderStore[uid] = {
                id: uid,
                status: status || 'reg',
                balance: sumdep || "0",
                withdraw: sumwithdraw || "0",
                country: country || "Unknown",
                isVerified: true,
                updatedAt: new Date().toISOString()
            };
            return res.status(200).send("Postback Received Successfully");
        }

        // 2. Dashboard se ID Verify Karna (POST Request)
        if (req.method === 'POST') {
            const { checkId } = req.body;
            
            if (!checkId) {
                return res.status(400).json({ success: false, message: "Please enter Trader ID" });
            }

            const user = traderStore[checkId];

            if (user) {
                return res.status(200).json({ success: true, ...user });
            } else {
                return res.status(404).json({ success: false, message: "ID not found in current session" });
            }
        }

        return res.status(400).json({ success: false, message: "Invalid Request" });

    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}
