// api/postback.js
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, update } from "firebase/database";

const firebaseConfig = { /* Aapki Firebase Config yahan aayegi */ };
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export default async function handler(req, res) {
    // Quotex GET method use karta hai, isliye hum query parameters lenge
    const { uid, status, sumdep, country } = req.query;

    if (!uid) return res.status(400).send("No Trader ID");

    try {
        const userRef = ref(db, 'users/' + uid);
        
        // Data update ya create karna
        await update(userRef, {
            trader_id: uid,
            status: status, // reg, ftd, dep etc.
            last_deposit: sumdep || 0,
            country: country,
            updatedAt: Date.now()
        });

        res.status(200).send("OK");
    } catch (error) {
        res.status(500).send("Error saving data");
    }
}
