const database = require("../services/database");
exports.getAllUser = async (req, res) => {
  try {
    const result = await database.client.query(`
      SELECT * FROM test.users
      `);
    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
exports.cresteUser = async (req, res) => {
  try {
    const result = await database.client.query({
      text: `
      INSERT INTO test.users (user_name  , first_name , last_name , job_title , email)
      VALUES($1,$2,$3,$4,$5)
      RETURNING *
      `,
      values: [
        req.body.user_name,
        req.body.first_name,
        req.body.last_name,
        req.body.job_title,
        req.body.email,
      ],
    });
    return res.status(201).json(result.rows);
  } catch (error) {}
};
exports.searchUser = async (req, res) => {
  const query = req.query.q.toLowerCase();
  const usersResult = await database.client.query(`
      SELECT * FROM test.users
      `);
  console.log(usersResult.rows, "user....");
  const results = usersResult?.rows.filter(
    (email) =>
      email.user_name.toLowerCase().includes(query) ||
      email.email.toLowerCase().includes(query)
  );
  res.json(results);
};
