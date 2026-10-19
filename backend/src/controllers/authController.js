const authService = require("../services/authService");
const handleError = require("../utils/handleError");

async function login(req, res) {
  try {
    res.json(await authService.login(req.body));
  } catch (err) {
    handleError(res, err);
  }
}

module.exports = { login };
