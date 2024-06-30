const { db } = require('../config/firebase');
const bcrypt = require('bcrypt');

async function createUser(userData) {
    try {
        const userQuery = await db.collection('Users').where('username', '==', userData.username).get();
        if (!userQuery.empty) {
            throw new Error('Username already exists');        }
        
        const hash = bcrypt.hashSync(userData.password, 10);
        const userRef = db.collection('Users').doc();
        
        await userRef.set({
            firstName: userData.firstname,
            lastName: userData.lastname,
            email: userData.email,
            username: userData.username,
            password: hash,
            wishList: []
        });
        
        return { id: userRef.id, ...userData };
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}


async function getUserByUsername(username, password) {
    const userSnapshot = await db.collection('Users').where('username', '==', username).get();
    if (userSnapshot.empty) {
        throw new Error('Invalid username or password');
    }
    const user = userSnapshot.docs[0].data();
    const resultPassword = bcrypt.compareSync(password, user.password);
    if (resultPassword) {
        const { wishList, firstName, lastName,profileImageURL } = user;
        return { wishList, firstName, lastName,profileImageURL };
    }
    else{
        throw new Error('Password incorrect')
    }
}

module.exports = {
    createUser, getUserByUsername
};
