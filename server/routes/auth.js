const express = require("express");

const { Register, fetchUser, fetchSingleUser, editUser, deleteUser } = require("../controllers/controller");

const router = express.Router();

router.get("/users", fetchUser);
router.get("/singleUser/:email_id", fetchSingleUser);
router.post("/register", Register);
router.put("/user/update/:email_id", editUser);
router.delete('/user/:id', deleteUser);

module.exports = router;