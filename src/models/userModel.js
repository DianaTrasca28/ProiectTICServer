const db = require('../config/firebase');

const userCollection = db.collection('Users');

const UserModel = {
    async getAll() {
        const snapshot = await userCollection.get();
        const users = [];
        snapshot.forEach(doc => {
            users.push({ id: doc.id, ...doc.data() });
        });
        return users;
    },

    async create(userData) {
        const userQuery = await db.collection('Users').where('username', '==', userData.username).get();
        if (!userQuery.empty) {
            throw new Error('Username already exists');
        } 
        const userRef = userCollection.doc();
        
        await db.collection("Users").add({
            firstName: userData.firstname,
            lastName: userData.lastname,
            email: userData.email,
            username: userData.username,
            password: hash,
            wishList: []
        });
        return { id: userRef.id, ...userData };
    },

    async getById(userId) {
        const userRef = userCollection.doc(userId);
        const doc = await userRef.get();
        if (!doc.exists) {
            throw new Error('User not found');
        }
        return { id: doc.id, ...doc.data() };
    },

    async update(userId, userData) {
        const userRef = userCollection.doc(userId);
        await userRef.update(userData);
        const updatedUser = await userRef.get();
        return { id: updatedUser.id, ...updatedUser.data() };
    },

    async delete(userId) {
        const userRef = userCollection.doc(userId);
        await userRef.delete();
        return { id: userId };
    }
};

module.exports = UserModel;
