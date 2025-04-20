import { db } from "../db.js";

export const fetch_campaign = (req, res) => {
  const campaignId = req.params.id;
  console.log("Fetching campaign with ID:", campaignId); // ✅

  const query = "SELECT * FROM campaign WHERE campaign_id = ?";
  db.query(query, [campaignId], (err, data) => {
    if (err) {
      console.error("Database error:", err); // ✅
      return res.status(500).json("Database error");
    }
    if (data.length === 0) {
      return res.status(404).json("Campaign not found");
    }
    return res.status(200).json(data[0]);
  });
};

export const donate = (req, res) => {
    const { email, campaignId, contribution, paymentMode } = req.body;

  // Step 1: Fetch user_id based on email
  const query = "SELECT user_id FROM users WHERE email = ?";
  db.query(query, [email], (err, result) => {
    if (err) {
      console.error("Database error:", err); 
      return res.status(500).json("Database error");
    }
    if (result.length === 0) {
      return res.status(400).json({ error: 'User not found' });
    }
    const userId = result[0].user_id;

    // Step 2: Insert donation into the donation table
    const donationQuery = `
      INSERT INTO donation (user_id, campaign_id, contribution, payment_mode) 
      VALUES (?, ?, ?, ?)
    `;
    db.query(donationQuery, [userId, campaignId, contribution, paymentMode], (err, donationResult) => {
      if (err) {
        console.error("Database error:", err); 
        return res.status(500).json("Error inserting donation");
      }

      // Step 3: Update the campaign's current_amount
      const updateCampaignQuery = `
        UPDATE campaign SET current_amount = current_amount + ? WHERE campaign_id = ?
      `;
      db.query(updateCampaignQuery, [contribution, campaignId], (err, updateResult) => {
        if (err) {
          console.error("Database error:", err); 
          return res.status(500).json("Error updating campaign amount");
        }

        res.status(200).json({
          message: 'Donation successful',
          donationId: donationResult.insertId,
          userId,
          campaignId,
          contribution,
          paymentMode
        });
      });
    });
  });
}
