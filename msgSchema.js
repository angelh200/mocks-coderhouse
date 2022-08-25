const { schema, normalize } = require('normalizr');

const authorSchema = new schema.Entity('authors');
const textSchema = new schema.Entity('texts', {
    author: authorSchema
});


module.exports = textSchema;