const log = require('../src/log');

module.exports = {
  async up(db, client) {
    const result = await db.collection('profiles').updateMany( {}, { $rename: { "habbits": "habits" } } )

    log.info('up 20230718115426-rename-habits-field', result)
  },

  async down(db, client) {
    const result = await db.collection('profiles').updateMany( {}, { $rename: { "habits": "habbits" } } )

    log.info('down 20230718115426-rename-habits-field', result)
  }
};
