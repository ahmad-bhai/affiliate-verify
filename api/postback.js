G5VLXM-8ge7jzU8ck9oYbulH0";

    // default async function handler(req, res) {
    const { uid, status, cid, sid, lid, country, sumdep } = req.query;
    const BOT_ID = "8320428359";
    const API_KEY = "AAFJLQfhXpzV0uzn0PO9lz1NqOO30uJFgok";

    // Agar UID nahi hai toh bhi error mat do, sirf console mein batao
    if (!uid) {
        console.log("⚠️ No UID provided, but saving other data for debugging");
        return res.status(200).send("No UID — but request received. Check bot logs.");
    }

    try {
        // Property save karte waqt status default "ftd" agar kuch aur ho
        let finalStatus = status;
        if (finalStatus === "reg" || finalStatus === "conf") finalStatus = "registered";
        if (finalStatus === "ftd" || finalStatus === "dep") finalStatus = "ftd";

        const bjs_url = `https://api.bots.business/v1/bots/${BOT_ID}/properties`;
        
        await fetch(bjs_url, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'api-key': API_KEY 
            },
            body: JSON.stringify({
                name: "qx_" + uid,
                value: finalStatus,
                type: "string"
            })
        });

        // Extra info bhi save karo (amount, country, etc.)
        if (sumdep && parseFloat(sumdep) > 0) {
            await fetch(bjs_url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'api-key': API_KEY },
                body: JSON.stringify({
                    name: "qx_deposit_" + uid,
                    value: sumdep,
                    type: "string"
                })
            });
        }

        return res.status(200).send(`✅ Data saved: UID=${uid}, Status=${finalStatus}, Deposit=${sumdep || 0}`);
    } catch (error) {
        console.error("Bot API error:", error);
        return res.status(500).send("Server error: " + error.message);
    }
}
