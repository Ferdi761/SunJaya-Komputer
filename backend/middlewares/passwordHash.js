const bcrypt = require("bcrypt");

const passwordHash = async (akun) => {
    if (akun.passwordHashed) {
        const saltRounds = await bcrypt.genSaltSync(10);
        akun.passwordHashed = bcrypt.hashSync(akun.passwordHashed, saltRounds);
      }
};

module.exports = passwordHash;