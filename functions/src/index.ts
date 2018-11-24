const functions = require('firebase-functions'); 
const admin = require('firebase-admin');


// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

admin.initializeApp(functions.config().firebase);

// Sets Unsolved Post Data
exports.setUnsovlvedPostData = functions.database.ref('/posts/').onCreate( post => {
    // Add +1 to unsolved depending on type 
    //whenever a new post is created
    const data = post.val();
    const type = data.type;

    let dataRef = functions.database.ref("/data/posts");

    return dataRef.once('value').then(function( val ) {
        const currentNumber = val.unsolved[type];
        val.unsolved[type] = currentNumber + 1;
        dataRef.child.set(val);
    });
});

exports.updateSolvedPostData = functions.database.ref('/posts/').onCreate(event => {
    // When a post is marked as Solved
    // -1 Unsolved
    // +1 Solved
    // Depending on type
});

exports.updateUnolvedPostData = functions.database.ref('/posts/').onCreate(event => {
    // Add// When a post is marked as Unsolved
    // +1 Unsolved
    // -1 Solved
    // Depending on type
});


