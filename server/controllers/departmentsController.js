const database = require("../services/database");

exports.getAllDepartments = async (req, res) => {
  try {
    const result = await database.client.query(
      "SELECT * FROM test.departments"
    );
    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
exports.getSingleDepartment = async (req, res) => {
  try {
    const result = await database.client.query({
      text: `
      SELECT *
      FROM test.departments
      WHERE department_id=$1
      `,
      values: [req.params.department_id],
    });
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Department not found." });
    }
    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
exports.createDepartment = async (req, res) => {
  try {
    if (!req.body.department_id && !req.body.department_name) {
      return res.status(442).json({ error: "Department Id and Name Requried" });
    }

    const result = await database.client.query({
      text: "INSERT INTO test.departments (department_id,department_name) VALUES ($1,$2) RETURNING *",
      values: [req.body.department_id, req.body.department_name],
    });
    return res.status(201).json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.upsertDepartment = async (req, res) => {
  try {
    const dataEntries = req.body;

    for (const entry of dataEntries) {
      const result = await database.client.query({
        text: `
            INSERT INTO test.departments (department_id, department_name)
            VALUES ($1, $2)
            ON CONFLICT (department_id)
            DO UPDATE
            SET department_name = EXCLUDED.department_name;
        `,
        values: [entry.department_id, entry.department_name],
      });
    }

    // res.status(200).send("Data upserted successfully");
    return res.status(200).json(dataEntries);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.deleteDepartment = async (req, res) => {
  try {
    const result = await database.client.query({
      text: "DELETE FROM test.departments WHERE department_id = $1",
      values: [req.params.department_id],
    });
    if (result.rowCount !== 0) {
      res.status(204).json({ result: "Successfully Deleted Department" });
    } else {
      return res.status(404).json({ error: "Department Not Found" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.updateDepartnemt = async (req, res) => {
  try {
    if (!req.body.department_name) {
      return res.status(422).json({ error: "Department Name is required." });
    } else {
      const existResult = await database.client.query({
        text: `
        SELECT EXISTS (SELECT * FROM test.departments
        WHERE department_id=$1 )
        `,
        values: [req.body.department_id],
      });
      if (existResult.rows[0].exists) {
        return res.status(409).json({ error: "Department already exists." });
      }
    }
    const result = await database.client.query({
      text: `
      UPDATE test.departments
      SET department_name=$1
      WHERE department_id=$2
      RETURNING *
      `,
      values: [req.body.department_name, req.params.department_id],
    });
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "department not found" });
    }
    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
