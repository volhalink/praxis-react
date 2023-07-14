const {
    database,
    up,
    down,
    status
  } = require('migrate-mongo');
const log = require('./log')

const getMigrationsStatusAsync = async() => {
    const { db } = await database.connect();
    const migrationStatus = await status(db);

    return migrationStatus;
}

const upAsync = async() => {
    const { db, client } = await database.connect();
    const migrated = await up(db, client);
    migrated.forEach(fileName => log.info('upAsync', `Migrated: ${fileName}`));
    return {
        migrated: migrated
    };
}

const downAsync = async() => {
    const { db, client } = await database.connect();
    const migratedDown = await down(db, client);
    migratedDown.forEach(fileName => log.info('downAsync', `Migrated Down: ${fileName}`));
    return {
        migrated: migratedDown
    };
}

module.exports = {
    getMigrationsStatusAsync,
    upAsync,
    downAsync,
  }