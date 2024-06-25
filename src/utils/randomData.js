const bcrypt = require('bcrypt');

function generateUserData() {
    const password = falso.randPassword();
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const user = {
        firstName: falso.randFirstName(),
        lastName: falso.randLastName(),
        email: falso.randEmail(),
        username: falso.randUsername(),
        password: hash,
        wishList: []
    };
    return user;
}

function generatePerfumeData() {
    const perfume = {
        price: falso.randPrice(),
        quantity: falso.randQuantity()
    };
    return perfume;
}

module.exports = { generateUserData, generatePerfumeData };
