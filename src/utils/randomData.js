const bcrypt = require('bcrypt');
const falso = require('@ngneat/falso');
const { bucket } = require('../config/firebase');

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


// Funcție pentru a obține link-uri de imagini din Firebase Storage
async function getImageFromStorage() {
    const [files] = await bucket.getFiles();

    const file = falso.rand(files);


    try {
        const imageUrl = await file.getSignedUrl({
            action: 'read',
            expires: '07-07-2025'
        });

        return imageUrl[0];
    } catch (error) {
        console.error('Error getting signed URL: ', error);
        throw error;
    }
}

async function generatePerfumeData() {
    const adjectives = ['Mystic', 'Elegant', 'Classic', 'Exotic', 'Charming'];
    const nouns = ['Blossom', 'Whisper', 'Dream', 'Fantasy', 'Essence'];
    const notes = ['Vanilie', 'Fructate', 'Florale', 'Animalice', 'Gurmande'];
    const descriptions = [
        'A captivating blend of floral and woody notes.',
        'A fresh and invigorating scent for everyday wear.',
        'An opulent fragrance with hints of vanilla and amber.',
        'A seductive aroma with a touch of oriental spices.',
        'A timeless fragrance that exudes sophistication.'
    ];
    const imageUrl =  await getImageFromStorage();

    const perfume = {
        name: `${falso.rand(adjectives)}${falso.rand(nouns)}`,
        descriptions: `${falso.rand(descriptions)}`,
        price: falso.randAmount({ symbol: '$'}),
        size: `${falso.randNumber({ min: 30, max: 100 })} ml`,
        notes: `${falso.rand(notes,{min: 3, max: 5})}`,
        image: imageUrl
    };
    return perfume;
}


module.exports = { generateUserData, generatePerfumeData };
