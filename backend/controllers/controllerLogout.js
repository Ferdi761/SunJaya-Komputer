const logout = (req, res) => {
    try {
        res
        .status(200)
        .clearCookie('logged_account')
        .json({
            status: 'success',
            message: 'Berhasil logout!'
        })
        .end();
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            msg: err
        }).end();
    }
};

module.exports = logout;