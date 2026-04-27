// Global variable to store IDs (Temporary - clears on deploy)
let traderStore = {};

export default async function handler(req, res) {
    const { uid, status, sumdep, sumwithdraw, country } = req.query;

    if (uid) {
        // Data save ho raha hai memory mein
        traderStore[uid] = {
            id: uid,
            status: status, // reg, ftd, dep
            balance: sumdep || 0,
            withdraw: sumwithdraw || 0,
            country: country,
            isVerified: true
        };
        return res.status(200).send("Postback Received");
    }
    
    // Agar humein verify karna ho (Frontend request)
    if (req.method === 'POST') {
        const { checkId } = req.body;
        const user = traderStore[checkId];
        
        if (user) {
            return res.status(200).json({ success: true, ...user });
        } else {
            return res.status(404).json({ success: false, message: "ID not found" });
        }
    }

    res.status(400).send("Invalid Request");
}
