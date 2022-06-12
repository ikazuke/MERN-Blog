const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const accessToken = req.header("accessToken");

  if (!accessToken) return res.json({ error: "User not logged in!" });

  try {
    const validToken = verify(accessToken, "importantsecret");

    if (validToken) {
      return next();
    }

    req.user = validToken;
  } catch (err) {
    return res.json({ error: err });
  }
};

module.exports = { validateToken };
