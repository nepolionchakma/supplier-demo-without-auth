const database = require("../services/database");
exports.getAllMessages = async (req, res) => {
  try {
    const result = await database.client.query(`
        SELECT * FROM test.messages
        ORDER BY id DESC
      `);
    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.getSingleMessage = async (req, res) => {
  try {
    const result = await database.client.query({
      text: `
      SELECT * FROM test.messages
      WHERE id=$1
      `,
      values: [req.params.id],
    });
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "message not Found" });
    }
    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
exports.createMessage = async (req, res) => {
  try {
    const result = await database.client.query({
      text: `
      INSERT INTO test.messages (sender_name,receiver_name,subject,message,status )
      VALUES ($1,$2,$3,$4,$5 )
      RETURNING *
      `,
      values: [
        req.body.sender_name,
        req.body.receiver_name,
        req.body.subject,
        req.body.message,
        req.body.status,
      ],
    });
    return res.status(201).json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
exports.upsertMessage = async (req, res) => {
  console.log(req.body);
  try {
    const messages = req.body;
    for (const message of messages) {
      const result = await database.client.query({
        text: `
      INSERT INTO test.messages (sender_name,receiver_name,subject,message,status )
      VALUES ($1,$2,$3,$4,$5 )
      RETURNING *
      `,
        values: [
          message.sender_name,
          message.receiver_name,
          message.subject,
          message.message,
          message.status,
        ],
      });
    }

    return res.status(201).json(messages);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
exports.updateMessage = async (req, res) => {
  await database.client.query({
    text: `
    UPDATE test.messages
    SET is_read_msg=1
    WHERE id=$1
    RETURNING *
    `,
    values: [req.params.id],
  });
};
exports.deleteMessage = async (req, res) => {
  try {
    const result = await database.client.query({
      text: `
      DELETE FROM test.messages WHERE id = $1
      `,
      values: [req.params.id],
    });
    if (result.rowCount == 0) {
      return res.status(404).json({ error: "message id Not Found" });
    } else {
      return res.status(204).send();
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
