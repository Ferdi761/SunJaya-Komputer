const logout = (req, res) => {
    try {
        res.status(200).clearCookie('logged_account').end();
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            msg: err
        }).end();
    }
};

module.exports = logout;