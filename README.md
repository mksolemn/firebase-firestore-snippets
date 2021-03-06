# firebase-firestore-snippets

### required packages
```
npm install --save @google-cloud/firestore

npm i --save lodash

```

## 1. Firestore nodejs deduper - remove duplicates from firestore
Same method could be user for firestore or any Array of data.

## Example: clearing duplicates from database by document field
Examples shows how to remove duplicates in Array - full firestore implementation - [HERE](https://github.com/mksolemn/firebase-firestore-snippets/blob/master/clear_dups.js)

```javascript
// clear_dups.js

dupeArray.map((val, indexOut) => {
    const tempObj = val;
    console.log('Original: ', val.title, ' :id: ', val.dupeId);
    dupeArray.map((inVal, indexIn) => {

        if (val.dupeId !== inVal.dupeId) { // IF YOU WANT TO KEEP ORIGINAL DATABASE ITEM
                                            // this will make sure that one item is left and the rest removed

            // change title & user.facebook_post_link to any desired field or add more fields...
            if (val.[YOUR-FIELD-VALUE] === inVal.[YOUR-FIELD-VALUE]) {
                firestore.doc('scraped_posts/' + inVal.dupeId).delete().then(() => {
                    console.log('Found duplicate: ', inVal.[YOUR-FIELD-VALUE], ' :id: ', inVal.dupeId);
                });
            }

        }
    })
})

```


## Run deduper
```

node deduper-run

```

## 2. Firestore delete by title or ID - delete single document

## Example: remove single document from firestore by ID or title
   Examples shows how to remove single document by ID or title - full firestore implementation - [HERE](https://github.com/mksolemn/firebase-firestore-snippets/blob/master/delete_single.js)

You can change title field to any other field you may need to delete by.

```javascript
// delete_single.js

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

```

## Run document delete

```

// delete by id
node run_delete --id 'id of property'

// delete by title
node run_delete --title 'Title of preperty'

```