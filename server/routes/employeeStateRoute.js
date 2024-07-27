const router = require("express").Router();
const employeeStateController = require("../controllers/employeeStateController");
router.get(
  "/employees-widget-state",
  employeeStateController.getEmployeesState
);
router.get(
  "/employees-widget-state-single/:employee_id",
  employeeStateController.getSingleState
);
router.post(
  "/employees-widget-state",
  employeeStateController.createEmployeeState
);
router.post(
  "/employees-widget-state/upsert",
  employeeStateController.upsertEmployeeState
);
router.put(
  "/employees-widget-state/:employee_id",
  employeeStateController.updateEmployeeState
);
router.delete(
  "/employees-widget-state/delete/:employee_id",
  employeeStateController.deleteEmployeeState
);
module.exports = router;
