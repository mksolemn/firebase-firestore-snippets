const commandLineArgs = require('command-line-args');
const optionDefinitions = [
    { name: 'id', alias: 'i'},
    { name: 'title', alias: 't'},
    { name: 'checkBySlug', alias: 's' }
]
const options = commandLineArgs(optionDefinitions);
deleter = require('./delete_single.js')
console.log('Delete options: \n',options);
deleter.deleteSingle(options.id, options.title, options.checkBySlug);

/* How to use


// delete by id
node run_delete --id 'id of property'

// delete by title
node run_delete --title 'Title of preperty'


 */