export default async function (req, res) {
    const { uid, status } = req.query;
    const BOT_ID = "8320428359";
    const API_KEY = "AAET0DP7fhG5VLXM-8ge7jzU8ck9oYbulH0";

    if (!uid) {
        return res.status(400).send("Error: No UID provided");
    }

    try {
        const bjs_url = `https://api.bots.business/v1/bots/${BOT_ID}/properties`;
        
        const bjs_res = await fetch(bjs_url, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'api-key': API_KEY 
            },
            body: JSON.stringify({
                name: "qx_" + uid,
                value: status || "registered",
                type: "string"
            })
        });

        const bjs_data = await bjs_res.text();
        return res.status(200).send("Success! Data sent to Bot.");
    } catch (error) {
        return res.status(500).send("Error: " + error.message);
    }
}

