const bcrypt = require('bcrypt');

const createHash = password => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);

module.exports = {
    createHash,
    isValidPassword
}