const log = require('../src/log');
const { ObjectId } = require ('mongodb');

module.exports = {
  async up(db, client) {
    /*let d = new Date('2023-07-17');
    log.info(`up temp date ${d.toISOString()}`);
    const habitId = new ObjectId("64b664a83033fc2c409934b5");
    
    let result = await db.collection('profiles').updateOne(
        {
          email : 'franya.mova@gmail.com',
          history: { $elemMatch: { habitid: habitId, completiondate: d} }
        },
        {
            $set: {
                "history.$": {
                    habitid: habitId,
                    completiondate: d
                }
            }
        }
    );
    log.info('up temp update', `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`)
    
    if(result.modifiedCount === 0) {
      let result = await db.collection('profiles').updateOne(
          {
            email : 'franya.mova@gmail.com',
            "habits._id": habitId,
          },
          {
              $addToSet: {
                  history: {
                      habitid: habitId,
                      completiondate: d,
                  }
              }
          }
      );

      log.info('up temp insert', `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`)
    }*/
  },

  async down(db, client) {
    log.info('down temp nothing to do')
    let result = await db.collection('profiles').updateOne(
      {
        email : 'franya.mova@gmail.com'
      },
      {
        $unset: { "history": "" }
      }
    );

    log.info('down temp delete', `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`);
  }
};
