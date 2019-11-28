import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';


admin.initializeApp();


export const addRole = functions.https.onCall((data, context) => {
        return admin.auth().getUserByEmail(data.email).then( user => {
            return admin.auth().setCustomUserClaims(user.uid, {
                admin : true
            })
        }).then(() =>{
            return {
                message : 'Usuario '+data.displayName+' se ha convertido en administrador'
            }
        }).catch(err =>{
            return err;
        })
})

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
