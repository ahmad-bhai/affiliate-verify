export default async function handler(req, res) {
    // 1. Inputs ko pakarna
    const { uid, status, sumdep } = req.query;
    
    // 2. Aapki Sahi API aur Bot ID
    const BOT_ID = "8320428359";
    const API_KEY = "AAFJLQfhXpzV0uzn0PO9lz1NqOO30uJFgok";

    if (!uid) {
        return res.status(200).send("Ahmad Bhai, system is live but UID is missing in URL.");
    }

    try {
        // Status mapping
        let finalStatus = status || "registered";
        if (finalStatus === "reg" || finalStatus === "conf") finalStatus = "registered";
        if (finalStatus === "ftd" || finalStatus === "dep") finalStatus = "ftd";

        const bjs_url = `https://api.bots.business/v1/bots/${BOT_ID}/properties`;

        // 3. BJS ko data bhejna (Standard fetch use kar rahe hain)
        const response = await fetch(bjs_url, {
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

        // 4. Response check karna
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`BJS API Error: ${errorText}`);
        }

        return res.status(200).send(`✅ Ahmad Bhai, Success! UID=${uid} saved.`);

    } catch (error) {
        console.error("Crash Details:", error.message);
        return res.status(500).send("Crash Fixed, but error: " + error.message);
    }
}
