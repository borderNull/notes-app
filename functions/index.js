// import * as functions from 'firebase-functions';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.notifyUser = functions.firestore
    .document('messages/{messageId}')
    .onCreate(event => {
        
    const message = event.data.data();
    const userId = message.recipientId

    // Message details for end user
    const payload = {
        notification: {
            title: 'New message!',
            body: `${message.senderId} sent you a new message`,
            icon: 'https://goo.gl/Fz9nrQ'
          }
    }

    // ref to the parent document
    const db = admin.firestore()
    const userRef = db.collection('users').doc(userId)


    // get users tokens and send notifications
    return userRef.get()
        .then(snapshot => snapshot.data() )
        .then(user => {
            
            const tokens = user.fcmTokens ? Object.keys(user.fcmTokens) : []

            if (!tokens.length) {
               throw new Error('User does not have any tokens!')
            }

            return admin.messaging().sendToDevice(tokens, payload)
        })
        .catch(err => console.log(err) )
});

exports.newNote = functions.firestore
    .document('income/{incomeId}')
    .onCreate(event => {
        
    const message = event.data.data();
    const noteId = message.id
    console.log(message);
    // Message details for end user
    const payload = {
        notification: {
            title: 'New message!',
            body: `${message.id} sent you a new message`,
            icon: 'https://goo.gl/Fz9nrQ'
          }
    }

    // ref to the parent document
    const db = admin.firestore()
    const userRef = db.collection('users').doc(noteId)


    // get users tokens and send notifications
    return userRef.get()
        .then(snapshot => snapshot.data() )
        .then(user => {
            
            const tokens = user.fcmTokens ? Object.keys(user.fcmTokens) : []

            if (!tokens.length) {
               throw new Error('User does not have any tokens!')
            }

            return admin.messaging().sendToDevice(tokens, payload)
        })
        .catch(err => console.log(err) )
});