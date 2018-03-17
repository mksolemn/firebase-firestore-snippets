module.exports = {

    clearDups: () => {
        const Firestore = require('@google-cloud/firestore');
        const _ = require('lodash');

        const firestore = new Firestore({
            projectId: ' [projectId] ',
            keyFilename: ' [filePath] ',
        });
        const dupeArray = [];
        const collection = firestore.collection('scraped_posts').get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {

                    const data = doc.data();
                    data.dupeId = doc.id;
                    dupeArray.push(data);
                });
                dupeArray.map((val, indexOut) => {
                    const tempObj = val;
                    console.log('Original: ', val.title, ' :id: ', val.dupeId);
                    dupeArray.map((inVal, indexIn) => {
                        if (val.dupeId !== inVal.dupeId) {
                            // change title & user.facebook_post_link to any desired field or add more fields...
                            if (val.title === inVal.title && val.user.facebook_post_link === inVal.user.facebook_post_link) {
                                firestore.doc('scraped_posts/' + inVal.dupeId).delete().then(() => {
                                    console.log('Found duplicate: ', inVal.title, ' :id: ', inVal.dupeId, ' -DELETED');
                                });
                            }
                        }
                    })
                })
            })
    }
}