const router = require("express").Router();
const departmentController = require("../controllers/departmentsController");
router.get("/departments", departmentController.getAllDepartments);
router.get(
  "/departments/:department_id",
  departmentController.getSingleDepartment
);
router.post("/departments", departmentController.createDepartment);
router.post("/Departments/upsert", departmentController.upsertDepartment);
router.put(
  "/departments/:department_id",
  departmentController.updateDepartnemt
);
router.delete(
  "/departments/:department_id",
  departmentController.deleteDepartment
);

module.exports = router;
