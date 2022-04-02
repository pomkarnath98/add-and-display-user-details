const express = require("express");
const multer = require("multer");
const { Register, fetchUser, fetchSingleUser, editUser, deleteUser } = require("../controllers/controller");

const FileUpload = multer({ dest: 'upload/' }).fields([{ name: 'image', maxCount: 1 }]);
const router = express.Router();

router.get("/users", fetchUser);
router.get("/singleUser/:email_id", fetchSingleUser);
router.post("/register", FileUpload, Register);
router.put("/user/update/:email_id", editUser);
router.delete('/user/:id', deleteUser);

module.exports = router;