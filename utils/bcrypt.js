const bcrypt = require("bcryptjs");

const hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
        
            if (err) reject({ msg: "Der opstod en server fejl, prøv igen senere eller kontakt os" });
            
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) return { msg: "Der opstod en server fejl, prøv igen senere eller kontakt os" };
                resolve(hash);
            });
          });
    });
}

const comparePassword = (password, userPassword) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, userPassword)
        .then(isMatch => {
            if (!isMatch) reject();
            resolve();
        });
    })
}

module.exports = {
    hashPassword,
    comparePassword
}