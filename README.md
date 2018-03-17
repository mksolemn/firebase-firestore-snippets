# firebase-firestore-snippets

## 1. Firestore nodejs deduper - remove duplicates from firestore
Same method could be user for firestore or any Array of data.

### required packages
```javascript

npm install --save @google-cloud/firestore

npm i --save lodash


```

## Example: clearing duplicates from database by document field
Examples shows how to remove duplicates in Array - full firestore implementation - [HERE](https://github.com/mksolemn/firebase-firestore-snippets/blob/master/clear_dups.js)

```javascript
//clear_dups.js

dupeArray.map((val, indexOut) => {
    const tempObj = val;
    console.log('Original: ', val.title, ' :id: ', val.dupeId);
    dupeArray.map((inVal, indexIn) => {

        if (val.dupeId !== inVal.dupeId) { // IF YOU WANT TO KEEP ORIGINAL DATABASE ITEM  - this will make sure that one item is left and the rest removed

            // change title & user.facebook_post_link to any desired field or add more fields...
            if (val.[YOUR-FIELD-VALUE] === inVal.[YOUR-FIELD-VALUE] && val.[YOUR-FIELD-VALUE.DEEPER.OBJECT] === inVal.[YOUR-FIELD-VALUE.DEEPER.OBJECT]) {
                firestore.doc('scraped_posts/' + inVal.dupeId).delete().then(() => {
                    console.log('Found duplicate: ', inVal.[YOUR-FIELD-VALUE], ' :id: ', inVal.dupeId);
                });
            }

        }
    })
})

```


## Run deduper
```javascript

node deduper-run

```