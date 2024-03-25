/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();

exports.getTherapistByName = functions.https.onRequest((req, res) => {
 const username = req.query.username
 const docRef = db.collection('therapists')
        .where('username', '==', username);
 // Partial match doesn't support in firebase cloud function
 const getDoc = docRef.get()
   .then(result => {
    result.forEach((doc) => {
        console.log(doc.id, doc.data());
    });
    res.send(result.docs.map(doc => doc.data()))
   })
   .catch(err => {
     console.log('Error getting document', err);
   });
});


exports.getTherapistByKeywords = functions.https.onRequest((req, res) => {
    const keywords = req.query.keywords
    const docRef = db.collection('therapists')
           .where('specialties', 'array-contains', keywords);
    // Partial match doesn't support in firebase cloud function
    const getDoc = docRef.get()
      .then(result => {
       result.forEach((doc) => {
           console.log(doc.id, doc.data());
       });
       res.send(result.docs.map(doc => doc.data()))
      })
      .catch(err => {
        console.log('Error getting document', err);
      });
   });
