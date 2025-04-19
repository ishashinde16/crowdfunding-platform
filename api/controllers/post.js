import { db } from "../db.js";

export const getCampaigns = (req, res) => {
  const category = req.query.cat;

  let q = "SELECT * FROM campaign"; 

  if (category) {
    q = "SELECT * FROM campaign WHERE category = ?";
  }

  db.query(q, category ? [category] : [], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};
