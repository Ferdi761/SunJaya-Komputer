const jwt = require("jsonwebtoken");

const logout = (req, res) => {
    res.cokie('roleAuth', '', { maxAge: 1 });
    res.end();
};

module.exports = logout;