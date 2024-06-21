import firebase from 'firebase/app'
import 'firebase/firestore'

// admin SDK
const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'gs://colectieparfumuribd.appspot.com'
});
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    next();
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

export default db;
