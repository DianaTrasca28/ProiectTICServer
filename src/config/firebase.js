// admin SDK
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'gs://colectieparfumuribd.appspot.com'
});
const db = admin.firestore();
const multer = require('multer');
const bucket = admin.storage().bucket('gs://colectieparfumuribd.appspot.com');
const uploadMiddleware = multer({
    storage: multer.memoryStorage(), 
    limits: {
        fileSize: 5 * 1024 * 1024 
    },
});

module.exports = {db};