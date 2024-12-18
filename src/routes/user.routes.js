const {
  signup,
  login,
  verifyToken
} = require("#controllers/user.controller");
const router = require("express").Router();

router.get("/:email&:password", login);
router.post("/signUp", signup);
router.get("/isLogged/:token", verifyToken);

module.exports = router;
