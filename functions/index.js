// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access Firestore.
const admin = require('firebase-admin');
admin.initializeApp();

exports.createUserDocument = functions.auth.user().onCreate(async(user) => {
  try {
    await admin.firestore().collection('users').doc(user.uid).set({
      credit: 0,
      uid: user.uid,
      posts: []
    });
  } catch(error) {
    console.log(error)
  }
  
  return true;
});

exports.createUserDocument = functions.firestore.document('posts/posts/{postType}/{docId}').onCreate(async(snap, context) => {
  try {
    const data = snap.data();
    await admin.firestore().collection('users').doc(data.author_id).update({ posts: admin.firestore.FieldValue.arrayUnion({
      title: data.title,
      date: data.date,
      thumbnail: data.evaluation[0].image
    })});
  } catch (error) {
    console.log(error);
  }
  
  return true;
});