const router = require("express").Router();
const employeeController = require("../controllers/employeesController");
router.get("/employees", employeeController.getAllEmployees);
router.get("/employees/:employee_id", employeeController.getSingleEmployee);
router.post("/employees", employeeController.createEmployee);
router.post("/employees/upsert", employeeController.upsertEmployee);
router.put("/employees/:employee_id", employeeController.updateEmployee);
router.put("/employees/update/:employee_id", employeeController.updateEmployee);
router.delete(
  "/employees/delete/:employee_id",
  employeeController.deleteEmployee
);
module.exports = router;
