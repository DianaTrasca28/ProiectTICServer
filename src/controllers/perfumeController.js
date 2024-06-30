const { db } = require('../config/firebase');
const generateData = require('../utils/randomData');

async function getPerfumes() {
    const perfumesRef = db.collection('Perfumes');
    const perfumesSnapshot = await perfumesRef.get();
    let perfumes = [];

    if (perfumesSnapshot.empty) {
        debugger
        const generatedPerfumes = await Promise.all(Array.from({ length: 50 },() => generateData.generatePerfumeData())); 
        const batch = db.batch(); // un batch pentru a adăuga toate parfumurile în mod atomic

        generatedPerfumes.forEach(element => {
            const uniqueID = db.collection("Perfumes").doc().id;
            const perfumeDocRef = db.collection("Perfumes").doc(uniqueID);
            batch.set(perfumeDocRef, element);
        });

        await batch.commit(); //  toate operațiile în batch

        const updatedSnapshot = await perfumesRef.get();
        updatedSnapshot.forEach((doc) => {
            perfumes.push(doc.data());
        });
    } else {
        perfumesSnapshot.forEach((doc) => {
            perfumes.push({ id: doc.id, ...doc.data() });
        });
    }
    return perfumes;
}


module.exports = {getPerfumes};