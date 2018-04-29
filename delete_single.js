module.exports = {

    deleteSingle: (postID, postTitle, checkBySlug) => {
        const Firestore = require('@google-cloud/firestore');
        const _ = require('lodash');

        const firestore = new Firestore({
            projectId: 'livinmalta-affc2',
            keyFilename: './configs/livinmalta-affc2-firebase-adminsdk-s7vnu-34464170f6.json',
        });
        const dupeArray = [];
            if(checkBySlug) {
                console.log('Found property: ', checkBySlug);
            }
        // check if title exists

        // delete by id
       deleteById(postID);
       deleteByTitle(postTitle);

        function deleteById(postID){
            if (postID) {
                firestore.doc('scraped_posts/' + postID).delete().then(() => {
                    console.log('Delete post: ', postID, ' :id: ', postID, ' -DELETED');
                });
            }
        }

        function deleteByTitle(postTitle) {
            if (postTitle) {
                firestore.collection('scraped_posts').where('title', '==', postTitle)
                    .get()
                    .then(querySnapshot => {
                        deleteById( querySnapshot.docs[0].id);
                    })
            }
        }
    }

}