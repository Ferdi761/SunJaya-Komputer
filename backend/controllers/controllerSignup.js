const signupView = (req, res) => {
    res.end("signup view");
};

const register = (req, res) => {
    res.end("register account");
};

module.exports = { signupView, register };