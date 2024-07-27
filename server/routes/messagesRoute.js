const router = require("express").Router();
const messagesController = require("../controllers/messagesController");
router.get("/messages", messagesController.getAllMessages);
router.get("/messages/:id", messagesController.getSingleMessage);
router.post("/messages/create", messagesController.createMessage);
router.post("/messages/upsert", messagesController.upsertMessage);
router.put("/messages/update/:id", messagesController.updateMessage);
router.delete("/messages/delete/:id", messagesController.deleteMessage);

module.exports = router;
