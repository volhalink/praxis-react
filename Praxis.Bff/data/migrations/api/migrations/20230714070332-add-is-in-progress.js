const log = require('../src/log');

module.exports = {
  async up(db, client) {
    const query = { };
    const updateDocument = {
      $set: { "habbits.$[].isInProgress": false }
    };
    const result = await db.collection('profiles').updateMany(query, updateDocument);
    log.info('up 20230714070332-add-is-in-progress', result)
  },

  async down(db, client) {
    const query = { };
    const updateDocument = {
      $unset: { "habbits.$[].isInProgress": "" }
    };
    const result = await db.collection('profiles').updateMany(query, updateDocument);
    log.info('down 20230714070332-add-is-in-progress', result)
  }
};
