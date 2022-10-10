const loginView = (req, res) => {
    res.end("loginView");
};

const login = (req, res) => {
    res.end("login");
};

module.exports = { loginView, login };