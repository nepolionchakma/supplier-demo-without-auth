const database = require("../services/database");

exports.getAllEmployees = async (req, res) => {
  try {
    const result = await database.client.query(
      `
      SELECT * FROM test.employees

      `
    );
    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.getSingleEmployee = async (req, res) => {
  try {
    const result = await database.client.query({
      text: `
      SELECT *
      FROM test.employees
      WHERE employee_id=$1
      `,
      values: [req.params.employee_id],
    });
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Employee not Found" });
    }
    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
exports.createEmployee = async (req, res) => {
  try {
    // if (
    //   !req.body.employee_id &&
    //   !req.body.user_name &&
    //   !req.body.first_name &&
    //   !req.body.last_name &&
    //   !req.body.job_title &&
    //   !req.body.email &&
    //   !req.body.department_id
    // ) {
    //   return res.status(442).json({
    //     error:
    //       "Employee employee_id,  user_name, first_name, last_name, email, job_title, department_id, Required",
    //   });
    // }

    // const existsResult = await database.client.query({
    //   text: "SELECT EXISTS (SELECT * FROM test.employees WHERE employee_id=$1 OR user_name=$2 OR first_name=$3 OR last_name=$4 OR email=$5)",
    //   values: [
    //     req.body.employee_id,
    //     req.body.user_name,
    //     req.body.first_name,
    //     req.body.last_name,
    //     req.body.email,
    //   ],
    // });
    // if (existsResult.rows[0].exists) {
    //   return res.status(409).json({
    //     error: `employee already exits`,
    //   });
    // }

    const result = await database.client.query({
      text: "INSERT INTO test.employees (user_name, first_name, last_name, job_title, email, department_id) VALUES ($1,$2,$3,$4,$5,$6 ) RETURNING *",
      values: [
        req.body.user_name,
        req.body.first_name,
        req.body.last_name,
        req.body.job_title,
        req.body.email,
        req.body.department_id,
      ],
    });
    return res.status(201).json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.upsertEmployee = async (req, res) => {
  try {
    const employees = req.body;
    // Check if req.body is an array
    // if (!Array.isArray(employees)) {
    //   return res
    //     .status(400)
    //     .json({ error: "Invalid input. Expected an array of employees." });
    // }
    for (const employee of employees) {
      const result = await database.client.query({
        text: `
      INSERT INTO test.employees ( employee_id, user_name, first_name, last_name, job_title, email, department_id)
      VALUES ($1,$2,$3,$4,$5,$6,$7)
      ON CONFLICT (employee_id)
      DO UPDATE SET
      employee_id = EXCLUDED.employee_id,
      user_name = EXCLUDED.user_name,
      first_name = EXCLUDED.first_name,
      last_name = EXCLUDED.last_name,
      job_title = EXCLUDED.job_title,
      email = EXCLUDED.email,
      department_id = EXCLUDED.department_id
      RETURNING *
       `,
        values: [
          employee.employee_id,
          employee.user_name,
          employee.first_name,
          employee.last_name,
          employee.job_title,
          employee.email,
          employee.department_id,
        ],
      });
    }

    return res.status(201).json(employees);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const result = await database.client.query({
      text: "DELETE FROM test.employees WHERE employee_id = $1",
      values: [req.params.employee_id],
    });
    if (result.rowCount == 0) {
      return res.status(404).json({ error: "Employee Not Found" });
    } else {
      return res.status(204).send();
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const result = await database.client.query({
      text: `
      UPDATE test.employees
      SET user_name=$1, job_title=$2,email=$3
      WHERE employee_id=$4
      RETURNING *
      `,
      values: [
        req.body.user_name,
        req.body.job_title,
        req.body.email,
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
// exports.updateEmployee = async (req, res) => {
//   try {
//     if (!req.body.user_name) {
//       return res.status(422).json({ error: "Name is required." });
//     } else if (!req.body.first_name) {
//       return res.status(422).json({ error: "First Name is required." });
//     } else if (!req.body.last_name) {
//       return res.status(422).json({ error: "Last Name is required." });
//     } else if (!req.body.job_title) {
//       return res.status(422).json({ error: "Job Title is required." });
//     } else if (!req.body.email) {
//       return res.status(422).json({ error: "Email is required." });
//     } else if (!req.body.department_id) {
//       return res.status(422).json({ error: "Department ID is required." });
//     } else {
//       const existResult = await database.client.query({
//         text: `
//         SELECT EXISTS (SELECT * FROM test.employees
//         WHERE employee_id=$1 )
//         `,
//         values: [req.body.employee_id],
//       });
//       if (existResult.rows[0].exists) {
//         return res.status(409).json({ error: "Employee already exists." });
//       }
//     }
//     const result = await database.client.query({
//       text: `
//       UPDATE test.employees
//       SET user_name=$1,first_name=$2,last_name=$3,job_title=$4,email=$5,department_id=$6
//       WHERE employee_id=$7
//       RETURNING *
//       `,
//       values: [
//         req.body.user_name,
//         req.body.first_name,
//         req.body.last_name,
//         req.body.job_title,
//         req.body.email,
//         req.body.department_id,
//         req.params.employee_id,
//       ],
//     });
//     if (result.rowCount === 0) {
//       return res.status(404).json({ error: "employee not found" });
//     }
//     return res.status(200).json(result.rows);
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// };
