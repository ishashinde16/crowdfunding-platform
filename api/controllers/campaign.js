import { db } from "../db.js";

export const add_campaign = (req, res) => {
  const {
    email,
    title,
    description,
    amountRequired,
    amountRaised,
    deadline,
    category,
    image
  } = req.body;

  // Get user_id from email
  db.query('SELECT user_id FROM users WHERE email = ?', [email], (err, results) => {
    if (err) {
      console.error('Error fetching user data:', err);
      return res.status(500).json({ success: false, message: 'Error fetching user data' });
    }

    if (results.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const user_id = results[0].user_id;

    // Insert into campaign table (column names fixed)
    const query = `
      INSERT INTO campaign (user_id, title, description, amount_req, current_amount, deadline, category, image)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      user_id,
      title,
      description,
      amountRequired,
      amountRaised,
      deadline,
      category,
      image
    ];

    db.query(query, values, (err, results) => {
      if (err) {
        console.error('Error inserting campaign data:', err);
        return res.status(500).json({ success: false, message: 'Error inserting campaign data' });
      }

      res.status(201).json({ success: true, message: 'Campaign created successfully' });
    });
  });
};
