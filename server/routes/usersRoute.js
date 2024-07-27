const router = require("express").Router();
const usersController = require("../controllers/usersController");
router.get("/users", usersController.getAllUser);
router.get("/users/search", usersController.searchUser);
router.post("/users/create", usersController.cresteUser);
module.exports = router;
