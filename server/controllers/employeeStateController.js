const database = require("../services/database");

exports.getEmployeesState = async (req, res) => {
  try {
    const result = await database.client.query(
      "SELECT * FROM test.employee_widget_attributes"
    );
    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
exports.getSingleState = async (req, res) => {
  try {
    const result = await database.client.query({
      text: `
      SELECT *
      FROM test.employee_widget_attributes
      WHERE employee_id=$1
      `,
      values: [req.params.employee_id],
    });
    if (result.rowCount === 0) {
      return res
        .status(404)
        .json({ error: "employess_widget_attribute not found." });
    }
    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
exports.createEmployeeState = async (req, res) => {
  try {
    if (!req.body.employee_id && !req.body.position && !req.body.widget_state) {
      return res
        .status(442)
        .json({ error: "employee_id, position and  widget_state Requried" });
    }

    const result = await database.client.query({
      text: "INSERT INTO test.employee_widget_attributes (employee_id,position,widget_state) VALUES ($1,$2,$3) RETURNING *",
      values: [req.body.employee_id, req.body.position, req.body.widget_state],
    });
    return res.status(201).json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.upsertEmployeeState = async (req, res) => {
  try {
    const reqWidgetState = req.body;
    for (const widgetState of reqWidgetState) {
      const result = await database.client.query({
        text: `
      INSERT INTO test.employee_widget_attributes ( employee_id, position, widget_state)
      VALUES ($1,$2,$3)
      ON CONFLICT (employee_id)
      DO UPDATE SET
      employee_id = EXCLUDED.employee_id,
      position = EXCLUDED.position,
      widget_state = EXCLUDED.widget_state
      RETURNING *
       `,
        values: [
          widgetState.employee_id,
          widgetState.position,
          widgetState.widget_state,
        ],
      });
    }

    return res.status(201).json(reqWidgetState);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.deleteEmployeeState = async (req, res) => {
  try {
    const result = await database.client.query({
      text: "DELETE FROM test.employee_widget_attributes WHERE employee_id = $1",
      values: [req.params.employee_id],
    });
    if (result.rowCount !== 0) {
      res.status(204).json({ result: "Successfully Deleted employee" });
    } else {
      return res.status(404).json({ error: "employee Not Found" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.updateEmployeeState = async (req, res) => {
  try {
    if (!req.body.position) {
      return res.status(422).json({ error: "Position is required." });
    } else if (!req.body.widget_state) {
      return res.status(422).json({ error: "widget_state is required." });
    } else {
      const existResult = await database.client.query({
        text: `
        SELECT EXISTS (SELECT * FROM test.employee_widget_attributes
        WHERE employee_id=$1 )
        `,
        values: [req.body.employee_id],
      });
      if (existResult.rows[0].exists) {
        return res
          .status(409)
          .json({ error: "employee widget_state already exists." });
      }
    }
    const result = await database.client.query({
      text: `
      UPDATE test.employee_widget_attributes
      SET position=$1,widget_state=$2
      WHERE employee_id=$3
      RETURNING *
      `,
      values: [
        req.body.position,
        req.body.widget_state,
        req.params.employee_id,
      ],
    });
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "employee not found" });
    }
    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
